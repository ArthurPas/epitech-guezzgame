import { useState } from 'react';
import { useStompClient, useSubscription } from 'react-stomp-hooks';

export const useChatWebSocket = () => {
    const stompClient = useStompClient();
    const [chatMessages, setChatMessages] = useState<string[]>([]);

    useSubscription('/topic/reply', (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message.body]);
    });

    const sendChatMessage = (message: string) => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/broadcast',
                body: message
            });
        }
    };

    return {
        chatMessages,
        sendChatMessage
    };
};
