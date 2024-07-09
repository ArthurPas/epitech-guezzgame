import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState, useEffect } from 'react';
import { playerData } from '@/lib/mocks/player';

export interface FriendsData {
    id: number;
    pseudo: string;
    score: number;
}

// Renvoyer l'id de la room

const idCurrentPlayer: number = 3;

const Index = () => {
    const [position, setPosition] = useState<number | null>(null);
    const [positionPlayer, setPositionPlayer] = useState<FriendsData | null>(null);

    useEffect(() => {
        const getPosition = () => {
            let currentPlayer: FriendsData | null = null;
            let index = 0;
            let pos = 0;

            playerData.forEach((player) => {
                index++;
                if (player.id === idCurrentPlayer) {
                    currentPlayer = player;
                    pos = index;
                }
            });

            setPosition(pos);
            setPositionPlayer(currentPlayer);
        };

        getPosition();
    }, []);

    if (positionPlayer === null) {
        console.error('Position player is null');
        return null;
    }

    return (
        <div className="grid gap min-h-screen w-full">
            <div className="grid place-items-center">
                <h1 className="text-amber-300 text-[64px]">Fin de partie</h1>
            </div>

            <div className="mt-[2.5rem]">
                <Card className="border-[1.5px] w-[25%] h-[90px] rounded-3xl mx-auto mb-8 bg-purple-300 bg-opacity-75">
                    <CardContent className="p-2 flex flex-col justify-center items-center rounded-3xl space-y-1">
                        <h2 className="title-small text-center font-semibold">Tu es {position}ème !</h2>
                        <h2 className="title-small font-bold text-amber-400 text-shadow mb-2">+{positionPlayer.score}pts</h2>
                    </CardContent>
                </Card>
                <Card className="w-[50%] h-[60%] mx-auto rounded-[4rem] mb-5 flex flex-col justify-center bg-purple-300 bg-opacity-75">
                    <CardContent className="p-2 max-h-52 overflow-y-auto flex flex-col justify-center items-center mx-4">
                        <ScrollArea className="h-72 px-4 w-full rounded-md">
                            {playerData.map((player) => (
                                <div className="flex items-start">
                                    <Avatar className="border-[1.5px] h-[33px] w-[33px] mr-2">
                                        <AvatarImage
                                            src={'https://res.cloudinary.com/dxaqv2hww/image/upload/v1720513515/shrek_4_vnuik2.webp'}
                                        />
                                        <AvatarFallback>SB</AvatarFallback>
                                    </Avatar>
                                    <div
                                        key={player.id}
                                        className={`flex w-full h-8 justify-between items-center p-4 shadow rounded-full mb-2 ${
                                            player.id === idCurrentPlayer ? 'bg-orange-300' : 'bg-white'
                                        }`}
                                    >
                                        <p className="text-left text-sm font-bold">{player.pseudo}</p>
                                        <p className="text-right text-[#37034E] text-xl font-bold">{player.score}</p>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <div className="grid place-items-center">
                <Button className=" bg-orange-300 mb-10">Terminer la partie</Button>
            </div>
        </div>
    );
};

export default Index;
