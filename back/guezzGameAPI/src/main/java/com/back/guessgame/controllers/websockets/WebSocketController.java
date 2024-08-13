package com.back.guessgame.controllers.websockets;
import com.back.guessgame.repository.dto.WebSocketPayload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
        @Autowired
        SimpMessagingTemplate messagingTemplate;

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
                logger.info("\nReceived message type : " +
                        message.getActionType() + "\n at " +
                        message.getDate().getTime() + "ms ("+ message.getDate()+") \n with payload : " + message
                        + "from socketId : " + sessionId);
        }

}
