package com.back.guessgame.controllers.websockets;

import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.ChatWebSocketPayload;
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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

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
        @Autowired
        private PartyRepository partyRepository;


        @MessageMapping("/broadcast")
        @SendTo("/topic/reply")
        public String broadcastMessage(@Payload String message) {
                Logger logger = LoggerFactory.getLogger(WebSocketController.class);
                logger.info("Received message: {}", message);
                return "You have received a message: " + message;
        }

        @MessageMapping("/user-message")
        @SendToUser("/queue/reply")
        public String sendBackToUser(@Payload String message, @Header("simpSessionId") String sessionId) {
                return "Only you have received this message: " + message;
        }

        @MessageMapping("/user-message-{userName}")
        public void sendToOtherUser(@Payload String message, @DestinationVariable String userName, @Header("simpSessionId") String sessionId) {
                messagingTemplate.convertAndSend("/queue/reply-" + userName, "You have a message from someone: " + message);
        }

        @MessageMapping("/sendToHost")
        public void listenToSocket(WebSocketPayload message, @Header("simpSessionId") String sessionId) {
                Logger logger = LoggerFactory.getLogger(WebSocketController.class);
                logger.info("\nReceived message type : " + message.getActionType() + "\n \n with payload : " + message + "from socketId : " + sessionId);
                User currentUser = userRepository.findByLoginOrMail(message.getFrom(), "").orElse(null);
                GameScore gameScore = webSocketService.createGameScore(message, currentUser);
                webSocketService.processSocketAction(message, currentUser, gameScore, messagingTemplate);
        }

}
