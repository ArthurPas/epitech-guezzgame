import { SendToHostType } from '@/interfaces/gameWebSockets';
import { useState } from 'react';
import { useStompClient, useSubscription } from 'react-stomp-hooks';

export const useGameWebSockets = () => {
    const stompClient = useStompClient();
    const [isRoundOver, setIsRoundOver] = useState(false);
    const [isGameOver, setGameOver] = useState(false);
    //TODO: un type pour le score
    const [scoreResult, setScoreResult] = useState([{ login: '', score: 0 }]);
    const defaultMessage = 'Votre future guezzTeam';
    //{ userLogin: 'Votre guezzTeam' }]:🤮 mais tant pis ça fonctionne bien
    const [usersJoinedParty, setUsersJoinedParty] = useState([{ userLogin: defaultMessage }]);

    // useSubscription allows to subscribe to a specific topic and execute a function when the back-end sends a new message on it
    useSubscription('/topic/reply/endRound', (message) => {
        setIsRoundOver(message.body === 'NEXT_ROUND');
    });

    useSubscription('/topic/reply/endGame', (message) => {
        setGameOver(message.body === 'END_GAME');
    });
    useSubscription('/topic/reply/score', (message) => {
        console.log(message.body + 'toto');
        const parsedResult = JSON.parse(message.body);
        if (Array.isArray(parsedResult)) {
            setScoreResult(parsedResult);
        } else {
            setScoreResult([]);
        }
    });
    useSubscription('/topic/reply/joinParty', (message) => {
        console.log(message.body + 'joinParty');
        const parsedResult: { userLogin: string } = JSON.parse(message.body);
        console.log(parsedResult.userLogin + 'toto');
        setUsersJoinedParty((prevState) => {
            if (prevState.length === 1 && prevState[0].userLogin === defaultMessage) {
                return [parsedResult];
            }
            return [...prevState, parsedResult];
        });
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
        scoreResult,
        usersJoinedParty,
        sendToHost
    };
};

export default useGameWebSockets;
