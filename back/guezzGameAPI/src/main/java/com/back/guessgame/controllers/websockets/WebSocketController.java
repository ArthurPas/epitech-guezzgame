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

        @MessageMapping("/user-message")
        @SendToUser("/queue/reply")
        public String sendBackToUser(@Payload String message, @Header("simpSessionId") String sessionId) {
                return "Only you have received this message: " + message;
        }

        @MessageMapping("/user-message-{userName}")
        public void sendToOtherUser(@Payload String message, @DestinationVariable String userName, @Header("simpSessionId") String sessionId) {
                messagingTemplate.convertAndSend("/queue/reply-" + userName, "You have a message from someone: " + message);
        }

        @MessageMapping("/listen")
        public void listenToSocket(WebSocketPayload message) {
                Logger logger = LoggerFactory.getLogger(WebSocketController.class);
                logger.info("Received message: " + message);

        }


}
