package com.back.guessgame.controllers.websockets;

import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.ActionType;
import com.back.guessgame.repository.dto.WebSocketPayload;
import com.back.guessgame.repository.entities.GameScore;
import com.back.guessgame.repository.entities.User;
import com.back.guessgame.services.GameService;
import com.back.guessgame.services.PartyService;
import com.back.guessgame.services.WebSocketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin(origins = "http://*.guezzgame.fun*")
public class WebSocketController {
        @Autowired
        SimpMessagingTemplate messagingTemplate;

        @Autowired
        private WebSocketService webSocketService;

        @Autowired
        GameService gameService;
        @Autowired
        private PartyService partyService;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private AuthenticationManager authenticationManager;


        @MessageMapping("/broadcast")
        @SendTo("/topic/reply")
        public String broadcastMessage(@Payload String message) {
                return "You have received a message: " + message;
        }

// Can also be written like this
//        @MessageMapping("/broadcast")
//        public void broadcastMessage(@Payload String message) {
//                messagingTemplate.convertAndSend("/topic/reply", "You have received a message: " + message);
//        }

        @MessageMapping("/user-message")
        @SendToUser("/queue/reply")
        public String sendBackToUser(@Payload String message, @Header("simpSessionId") String sessionId) {
                return "Only you have received this message: " + message;
        }

// Can also be written like this
//      @MessageMapping("/user-message")
//      public void sendBackToUser(@Payload String message, @Header("simpSessionId") String sessionId) {
//                messagingTemplate.convertAndSendToUser(userName, "/queue/reply", "Only you have received this message: " + message;
//      }

        @MessageMapping("/user-message-{userName}")
        public void sendToOtherUser(@Payload String message, @DestinationVariable String userName, @Header("simpSessionId") String sessionId) {
                messagingTemplate.convertAndSend("/queue/reply-" + userName, "You have a message from someone: " + message);
        }

        @MessageMapping("/sendToHost")
        public void listenToSocket(WebSocketPayload message, @Header("simpSessionId") String sessionId) {
                Logger logger = LoggerFactory.getLogger(WebSocketController.class);
                logger.info("\nReceived message type : " + message.getActionType() + "\n \n with payload : " + message + "from socketId : " + sessionId);
                logger.info(SecurityContextHolder.getContext().toString());
                User currentUser = userRepository.findByLoginOrMail(message.getFrom(), "").orElse(null);
                GameScore gameScore = webSocketService.saveSocket(message, currentUser);
                if(gameScore.getActionType().equals(ActionType.END_ROUND)) {
                        messagingTemplate.convertAndSend("/topic/reply/endRound", "NEXT_ROUND");
                }
                if(gameScore.getActionType().equals(ActionType.END_GAME)) {
                        messagingTemplate.convertAndSend("/topic/reply/endGame", "END_GAME");
                        Map<User, Integer> userPoints = new HashMap<>();
                        for (User user : partyService.getAllUserByPartyId(gameScore.getParty().getId())) {
                                userPoints.put(user, gameService.calculatePointsByUserByGame(gameScore.getGame(), user, gameScore.getParty()));
                        }
                        messagingTemplate.convertAndSend("/topic/reply", userPoints);
                }

        }

}
