// components/Game.js
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import { jwtDecode } from 'jwt-decode';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import WaitForPlayers from '@/components/gameLayout/waitScreen';
import useGameWebSockets from '@/hooks/useGameWebSockets';
import { GameData } from '@/interfaces/gameWebSockets';
import EndGameScore from '@/components/endGameScore';

const goodMerguez = '/merguezz_OK.png';
const badMerguez = '/wrong_merguezz.png';
const grill = '/homer_bbq.jpg';

let userLogin = 'anonymous';
let partyCode = undefined;
if (typeof window !== 'undefined') {
    partyCode = localStorage?.getItem('partyCode') || '';
    const token = localStorage.getItem('authToken') || '';
    let jwtDecoded;
    if (token) {
        jwtDecoded = jwtDecode(token);
    }
    userLogin = jwtDecoded?.sub || 'anonymous';
}
const items = [
    { src: goodMerguez, isGood: true },
    { src: badMerguez, isGood: false },
    { src: badMerguez, isGood: false },
    { src: badMerguez, isGood: false },
    { src: badMerguez, isGood: false },
    { src: badMerguez, isGood: false },
    { src: badMerguez, isGood: false }
];

const bonuses = [
    { type: 'Bonus', points: 5 },
    { type: 'Bonus', points: 10 },
    { type: 'Malus', points: -5 },
    { type: 'Malus', points: -10 }
];

const getRandomItem = (array: string | any[]) => {
    return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = (array: (string | any)[]) => {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const getRandomPosition = (maxWidth: number, maxHeight: number) => {
    const x = Math.floor(Math.random() * maxWidth);
    const y = Math.floor(Math.random() * maxHeight);
    return { x, y };
};

const isOverlapping = (pos1: { x: number; y: number }, pos2: { x: number; y: number }, size = 50) => {
    const distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    return distance < size;
};

const ClickGame = () => {
    const { isGameOver, isRoundOver, sendToHost, allPlayersReady } = useGameWebSockets();
    const nbRound = 5;
    // const [result, setResult] = useState([{ login: '', score: 0 }]);
    const [targetItem, setTargetItem] = useState('');
    const [shuffledItems, setShuffledItems] = useState<{ src: string; isGood: boolean }[]>([]);
    const [log, setLog] = useState<{ login: string; timestamp: number }[]>([]);
    const [countdown, setCountdown] = useState(5);
    const [isWaiting, setIsWaiting] = useState(false);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [modalOpen, setModalOpen] = useState(true);
    const stompClient = useStompClient();

    useEffect(() => {
        setNewRound();
    }, []);

    useEffect(() => {
        setIsWaiting(isRoundOver);
    }, [isRoundOver]);

    let gameData: GameData = {
        from: userLogin,
        date: Date.now(), //TODO: Mettre à jour la date avant l'envoi de gameData
        nbPoints: score,
        gameName: 'CLICK_GAME',
        roundNumber: round,
        partyCode: partyCode || '',
        playerInfo: { login: userLogin, timestamp: Date.now() } //TODO: Mettre à jour le timestamp avant l'envoi de gameData
    };

    useEffect(() => {
        if (isWaiting) {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setIsWaiting(false);
                setRound(round + 1);
                setNewRound();
            }
        }
    }, [countdown, isWaiting]);

    const setNewRound = () => {
        const newTargetItem = getRandomItem(items);
        setTargetItem(newTargetItem);
        setShuffledItems(shuffleArray([...items]));
        setCountdown(5);
        if (round > nbRound) {
            sendToHost({ actionType: 'END_GAME', gameData });
        }
    };

    function sendSocketAfterClick(points: number, playerInfo: { login: string; timestamp: number }, roundNumber: number) {
        gameData.date = Date.now();
        gameData.nbPoints = score;
        gameData.roundNumber = round;
        sendToHost({ actionType: 'FASTER_WIN', gameData });
    }
    function sendSocketEndRound(points: number, playerInfo: { login: string; timestamp: number }, roundNumber: number) {
        sendToHost({ actionType: 'END_ROUND', gameData });
    }

    const handleClick = (item: { src: string; isGood: boolean }) => {
        const timestamp = Date.now();
        const playerInfo = { login: userLogin, timestamp };

        if (item.isGood) {
            let points = 10;
            if (round % 2 === 0 || round % 3 === 0) {
                const bonusOrMalus = getRandomItem(bonuses);
                points += bonusOrMalus.points;
            }
            setLog((prevLog) => [...prevLog, playerInfo] as { login: string; timestamp: number }[]);
            setScore((prevScore) => prevScore + points);
            sendSocketAfterClick(points, playerInfo, round);
            sendSocketEndRound(points, playerInfo, round);
            setIsWaiting(true);
        } else {
        }
    };

    const getNonOverlappingPosition = (existingPositions: { x: number; y: number }[], maxWidth: number, maxHeight: number) => {
        const size = 50;
        let position: { x: number; y: number } = { x: 0, y: 0 };
        let isOverlappingAny;
        let maxAttempts = 100;
        let attempts = 0;

        do {
            if (attempts > maxAttempts) {
                console.warn('Impossible de trouver une position non superposée après plusieurs tentatives.');
                break;
            }
            position = getRandomPosition(maxWidth - size, maxHeight - size);
            isOverlappingAny = existingPositions.some((existingPosition) => isOverlapping(existingPosition, position, size));
            attempts++;
        } while (isOverlappingAny);

        return position;
    };

    const handleStartGame = () => {
        setModalOpen(false);
    };

    if (isGameOver) {
        return <EndGameScore login={gameData.playerInfo.login} gameName={gameData.gameName} partyCode={gameData.partyCode} />;
    } else {
        if (modalOpen) {
            return (
                <div className="flex justify-center items-center h-full">
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogContent>
                            <div className="flex flex-col items-center justify-center p-6">
                                <h2 className="text-xl font-bold mb-4">Click Game</h2>
                                <p>
                                    Les règles du Click Game sont simples : Vous devez cliquer sur l'item correct aussi rapidement que
                                    possible.
                                </p>
                                <br />
                                <h2 className="text-xl font-bold">Système de points :</h2>
                                <ul className="p-4">
                                    <li>Cliquez sur l'item correct pour gagner 10 points.</li>
                                    <li>À chaque manche, un bonus ou un malus aléatoire peut être appliqué au score.</li>
                                    <li>Un bonus peut ajouter 5 ou 10 points supplémentaires.</li>
                                    <li>Un malus peut retirer 5 ou 10 points.</li>
                                </ul>
                                <Button
                                    onClick={handleStartGame}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Commencer le Click Game
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        }
        if (!allPlayersReady && !modalOpen) {
            return (
                <WaitForPlayers
                    from={gameData.from}
                    date={gameData.date}
                    nbPoints={0}
                    gameName={gameData.gameName}
                    roundNumber={0}
                    partyCode={gameData.partyCode}
                    playerInfo={gameData.playerInfo}
                ></WaitForPlayers>
            );
        } else {
            return (
                <div className="relative flex justify-center items-center h-full">
                    <Card className="relative rounded-[0.9rem] border-2 border-black p-5 w-full h-full">
                        <div className="relative w-full h-full">
                            {shuffledItems.map((item: { src: string }, index) => {
                                const existingPositions = shuffledItems.slice(0, index).map((_, i) => {
                                    const pos = getRandomPosition(500, 500);
                                    return { x: pos.x, y: pos.y };
                                });

                                const { x, y } = getNonOverlappingPosition(existingPositions, 500, 500);

                                return (
                                    <Button
                                        key={index}
                                        onClick={() => !isWaiting && handleClick({ src: item.src, isGood: true })}
                                        style={{
                                            position: 'absolute',
                                            left: `${x}px`,
                                            top: `${y}px`,
                                            width: '150px',
                                            padding: 0,
                                            backgroundColor: 'transparent'
                                        }}
                                        className="shadow-none border-none"
                                        disabled={isWaiting}
                                    >
                                        <img src={item.src} alt="merguez" style={{ width: '100%' }} />
                                    </Button>
                                );
                            })}
                            {isWaiting && (
                                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-10">
                                    <img src={grill} alt="Grill overlay" className="max-w-full max-h-full" />
                                    <h2 className="absolute text-white text-2xl">Next round in: {countdown}s</h2>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            );
        }
    }
};

export default ClickGame;
