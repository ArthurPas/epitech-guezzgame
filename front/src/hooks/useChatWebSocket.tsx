import { filterMessage } from '@/lib/moderation';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useStompClient, useSubscription } from 'react-stomp-hooks';

export const useChatWebSocket = () => {
    const stompClient = useStompClient();
    const [chatMessages, setChatMessages] = useState<{ username: string; message: string }[]>([]);

    let userLogin = 'anonymous';
    if (typeof window !== 'undefined' && localStorage.getItem('authToken')) {
        const token = localStorage.getItem('authToken') || '';
        const jwtDecoded = jwtDecode(token);
        userLogin = jwtDecoded.sub || 'anonymous';
    }

    useSubscription('/topic/reply', (message) => {
        const parsedMessage = JSON.parse(message.body);
        setChatMessages((prevMessages) => [...prevMessages, parsedMessage]);
    });

    const sendChatMessage = (message: string) => {
        if (stompClient) {
            const filteredMessage = filterMessage(message);
            const messageData = {
                message: filteredMessage,
                username: userLogin
            };
            stompClient.publish({
                destination: '/app/broadcast',
                body: JSON.stringify(messageData)
            });
        }
    };

    return {
        chatMessages,
        sendChatMessage
    };
};
