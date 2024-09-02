import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { useRouter } from 'next/router';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useGameWebSockets from '@/hooks/useGameWebSockets';
interface Score {
    login: string;
    score: number;
    profilePicture?: string;
}

interface EndGameScoreProps {
    login: string;
    gameName: string;

    partyCode: string;
}

const EndGameScore: React.FC<EndGameScoreProps> = ({ login, gameName, partyCode }) => {
    const { sendToHost, scoreResult, isPartyOver } = useGameWebSockets();
    const Router = useRouter();
    const navigateRoom = () => {
        if (isPartyOver) {
            Router.push('/room');
        }
        const gameData = {
            from: login,
            date: Date.now(),
            nbPoints: 0,
            gameName: gameName,
            roundNumber: 0,
            partyCode: partyCode,
            playerInfo: { login: login, timestamp: Date.now() }
        };
        sendToHost({ actionType: 'NEXT_GAME', gameData: gameData });
    };

    return (
        <div className="grid gap min-h-screen w-full">
            <div className="grid place-items-center">
                {isPartyOver && <h1 className="text-amber-300 text-[64px]">Fin de la partie</h1>}
                {!isPartyOver && <h1 className="text-amber-300 text-[64px]">Fin du jeu</h1>}
            </div>

            <div className="mt-[2.5rem]">
                <Card className="w-[50%] h-[60%] mx-auto rounded-[4rem] mb-5 flex flex-col justify-center bg-purple-300 bg-opacity-75">
                    <CardContent className="p-2 max-h-52 overflow-y-auto flex flex-col justify-center items-center mx-4">
                        <ScrollArea className="h-72 px-4 w-full rounded-md mt-[1vh]">
                            {scoreResult
                                .sort((a, b) => b.score - a.score)
                                .map((player) => {
                                    console.log('player', player);
                                    const backgroundColorClass = player.login === login ? 'bg-amber-300' : 'bg-white';
                                    return (
                                        <div key={player.login} className="flex items-start mb-2">
                                            <div
                                                className={`flex w-full h-8 justify-between items-center p-4 shadow rounded-full ${backgroundColorClass}`}
                                            >
                                                <Avatar className="border-[1.5px] h-[33px] w-[33px] mr-2">
                                                    <AvatarImage src={player.profilePicture} />
                                                    <AvatarFallback>SB</AvatarFallback>
                                                </Avatar>
                                                <p className="text-left text-sm font-bold">{player.login}</p>
                                                <p className="text-right text-[#37034E] text-xl font-bold">{player.score}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <div className="grid place-items-center">
                <Button className=" bg-orange-300 mb-10" onClick={navigateRoom}>
                    {isPartyOver && 'Suite de la partie !'}
                    {!isPartyOver && 'Prochain jeu !'}
                </Button>
            </div>
        </div>
    );
};

export default EndGameScore;
