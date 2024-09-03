import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import useGameWebSockets from '@/hooks/useGameWebSockets';
import { GameData } from '@/interfaces/gameWebSockets';
export const WaitForPlayers = (gameInfo: GameData) => {
    const [isReady, setIsReady] = useState(false);
    const { sendToHost } = useGameWebSockets();
    const handleClickReady = () => {
        setIsReady(true);
        sendToHost({ actionType: 'USER_READY', gameData: gameInfo });
    };
    return (
        <div className="flex flex-col col-span-1 items-center justify-center h-full">
            {/* DEBUG */}
            <h2>POV du joueur : {gameInfo.from}</h2>
            {/*  */}
            <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-center">On attend que ta guezzTeam soit prête</p>
                <div className="mt-4">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>
            <Button disabled={isReady} onClick={handleClickReady} className="bg-amber-500 m-2">
                Je suis prêt
            </Button>
        </div>
    );
};
export default WaitForPlayers;
