import { SendToHostType } from '@/interfaces/gameWebSockets';
import { useState } from 'react';
import { useStompClient, useSubscription } from 'react-stomp-hooks';

export const useGameWebSockets = () => {
    const stompClient = useStompClient();
    const [isRoundOver, setIsRoundOver] = useState(false);
    const [isGameOver, setGameOver] = useState(false);

    // useSubscription allows to subscribe to a specific topic and execute a function when the back-end sends a new message on it
    useSubscription('/topic/reply/endRound', (message) => {
        setIsRoundOver(message.body === 'NEXT_ROUND');
    });

    useSubscription('/topic/reply/endGame', (message) => {
        setGameOver(message.body === 'END_GAME');
    });

    // Allows to send a message to the back-end
    const sendToHost = ({ actionType, gameData }: SendToHostType) => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/sendToHost',
                body: JSON.stringify({ actionType, ...gameData })
            });
        }
    };

    return {
        isRoundOver,
        isGameOver,
        sendToHost
    };
};

export default useGameWebSockets;
