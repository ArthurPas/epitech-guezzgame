import { Chat } from '@/components/gameLayout/Chat';
import { Players } from '@/components/gameLayout/Players';
import GeoGuezzer from '@/components/games/GeoGuezzer/GeoGuezzer';
import CultureGuezz from '@/components/games/CultureGuezz/CultureGuezz';
import { MovieGuesser } from '@/components/games/MovieGuesser/MovieGuesser';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CarouselDApiDemo } from '@/components/ui/CarouselDApiDemo';
import useGameWebSockets from '@/hooks/useGameWebSockets';
import ClickGame from '@/pages/clickGame';
import { useState } from 'react';
import { GameData } from '@/interfaces/gameWebSockets';

const games = ['BLIND_TEST', 'MOVIE_GUESSER', 'CLICK_GAME', 'TITRE', 'GEO_GUEZZER', 'JUNGLE_SPEED', 'CultureGuezz'];
const Gameplay = () => {
    const { currentGame, sendToHost } = useGameWebSockets();
    const [currentGameDebug, setCurrentGameDebug] = useState('');
    console.log('currentGame', currentGame);
    let partyCode = ' ';
    if (typeof window !== 'undefined') {
        partyCode = localStorage?.getItem('partyCode') || '';
    }
    if (currentGame === 'MENU') {
        let gameData: GameData = {
            from: '',
            date: Date.now(), //TODO: Mettre à jour la date avant l'envoi de gameData
            nbPoints: 0,
            gameName: 'MENU',
            roundNumber: 0,
            partyCode: partyCode || ' ',
            playerInfo: { login: '', timestamp: Date.now() }
        };
        sendToHost({ actionType: 'NEXT_GAME', gameData: gameData });
    }
    const debugDev = true;
    if (debugDev) {
        return (
            <>
                <div className="flex flex-col-reverse lg:flex-row-reverse p-4 lg:p-6 gap-2 lg:gap-4 h-[100vh]">
                    <div className="flex flex-row  lg:flex-col justify-between w-full lg:w-[20%] gap-2 lg:gap-3 h-[20%] lg:h-[100%] ">
                        <Players />
                        <Chat />
                        <div>
                            {games.map((game) => {
                                return (
                                    <Button
                                        key={game}
                                        className={`m-1 ${currentGame === game ? 'bg-white' : ''}`}
                                        variant={'reverse'}
                                        onClick={() => {
                                            setCurrentGameDebug(game);
                                        }}
                                    >
                                        {game}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="relative w-full flex flex-col items-center gap-2 h-[100%]">
                        <Card className="h-[100%] rounded-[0.9rem] priority-rounded w-full lg:min-w-[98%] bg-purple-700 ">
                            {currentGameDebug === 'BLIND_TEST' && <CarouselDApiDemo />}
                            {currentGameDebug === 'MOVIE_GUESSER' && <MovieGuesser />}
                            {currentGameDebug === 'GEO_GUEZZER' && <GeoGuezzer />}
                            {currentGameDebug === 'CLICK_GAME' && <ClickGame />}
                            {currentGameDebug === 'CultureGuezz' && <CultureGuezz />}
                        </Card>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="flex flex-col-reverse lg:flex-row-reverse p-4 lg:p-6 gap-2 lg:gap-4 h-[100vh]">
                    <div className="flex flex-row  lg:flex-col justify-between w-full lg:w-[20%] gap-2 lg:gap-3 h-[20%] lg:h-[100%] ">
                        <Players />
                        <Chat />
                        <div></div>
                    </div>
                    <div className="relative w-full flex flex-col items-center gap-2 h-[100%]">
                        <Card className="h-[100%] rounded-[0.9rem] priority-rounded w-full lg:min-w-[98%] bg-purple-700 ">
                            {currentGame === 'BLIND_TEST' && <CarouselDApiDemo />}
                            {currentGame === 'MOVIE_GUESSER' && <MovieGuesser />}
                            {currentGame === 'GEO_GUEZZER' && <GeoGuezzer />}
                            {currentGame === 'CLICK_GAME' && <ClickGame />}
                        </Card>
                    </div>
                </div>
            </>
        );
    }
};

export default Gameplay;
