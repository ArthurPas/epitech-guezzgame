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
import { useGetPartyScores } from '@/hooks/partyScores';
import EndGameScore from '@/components/endGameScore';
import { jwtDecode } from 'jwt-decode';
const games = ['BLIND_TEST', 'MOVIE_GUESSER', 'CLICK_GAME', 'TITRE', 'GEO_GUEZZER', 'JUNGLE_SPEED', 'CULTURE_GUEZZ'];
const Gameplay = () => {
    const { currentGame, sendToHost, isPartyOver, scoreResult } = useGameWebSockets();
    const [currentGameDebug, setCurrentGameDebug] = useState('');
    let partyCode = ' ';
    let userLogin = 'anonymous';
    if (typeof window !== 'undefined') {
        partyCode = localStorage?.getItem('partyCode') || '';
        const token = localStorage.getItem('authToken') || '';
        const jwtDecoded = jwtDecode(token);
        userLogin = jwtDecoded.sub || 'anonymous';
    }
    const { data: partyScoresData, isError: isPartyScoreError, isLoading: isPartyScoresLoading } = useGetPartyScores(partyCode);

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
    const debugDev = false;
    if (debugDev) {
        return (
            <>
                <div className="flex flex-col-reverse lg:flex-row-reverse p-4 lg:p-6 gap-2 lg:gap-4 h-[100vh]">
                    <div className="flex flex-row  lg:flex-col justify-between w-full lg:w-[20%] gap-2 lg:gap-3 h-[20%] lg:h-[100%] ">
                        {!isPartyScoresLoading && !isPartyScoreError && partyScoresData && <Players playerData={partyScoresData.scores} />}
                        <Chat />
                        <div>
                            {games.map((game) => {
                                return (
                                    <Button
                                        key={game}
                                        className={`m-[2px] px-[8px] text-[12px] ${currentGame === game ? 'bg-white' : ''}`}
                                        variant={'reverse'}
                                        onClick={() => {
                                            setCurrentGameDebug(game);
                                        }}
                                    >
                                        {game.split('_')[0]}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="relative w-full flex flex-col items-center gap-2 h-[100%]">
                        <Card className="h-[100%] rounded-[0.9rem] priority-rounded w-full lg:min-w-[98%] from-purple-700 via-purple-700 to-purple-700">
                            {currentGameDebug === 'BLIND_TEST' && <CarouselDApiDemo />}
                            {currentGameDebug === 'MOVIE_GUESSER' && <MovieGuesser />}
                            {currentGameDebug === 'GEO_GUEZZER' && <GeoGuezzer />}
                            {currentGameDebug === 'CLICK_GAME' && <ClickGame />}
                            {currentGameDebug === 'CULTURE_GUEZZ' && <CultureGuezz />}
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
                        {!isPartyScoresLoading && !isPartyScoreError && partyScoresData && <Players playerData={partyScoresData.scores} />}
                        <Chat />
                    </div>
                    <div className="relative w-full flex flex-col items-center gap-2 h-[100%]">
                        <Card className="h-[100%] rounded-[0.9rem] priority-rounded w-full lg:min-w-[98%] bg-gradient-to-b from-purple-700 via-purple-700 to-purple-700">
                            {currentGame === 'BLIND_TEST' && <CarouselDApiDemo />}
                            {currentGame === 'MOVIE_GUESSER' && <MovieGuesser />}
                            {currentGame === 'GEO_GUEZZER' && <GeoGuezzer />}
                            {currentGame === 'CLICK_GAME' && <ClickGame />}
                            {currentGame === 'CULTURE_GUEZZ' && <CultureGuezz />}
                        </Card>
                    </div>
                </div>
            </>
        );
    }
};

export default Gameplay;
