import { Chat } from '@/components/gameLayout/Chat';
import { Players } from '@/components/gameLayout/Players';
import { GuessGame } from '@/components/games/GuessGame/GuessGame';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CarouselDApiDemo } from '@/components/ui/CarouselDApiDemo';
import { useState } from 'react';

const games = ['BlindTest', 'GuessGame', 'TapTaupes', 'Titre', 'GeoGuessr', 'JungleSpeed'];

const Gameplay = () => {
    const [currentGame, setCurrentGame] = useState('');

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
                                        setCurrentGame(game);
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
                        {currentGame === 'BlindTest' && <CarouselDApiDemo />}
                        {currentGame === 'GuessGame' && <GuessGame />}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Gameplay;
