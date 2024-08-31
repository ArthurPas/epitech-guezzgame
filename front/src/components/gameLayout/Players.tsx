import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PartyScoresType } from '@/interfaces/partyScores';
import { jwtDecode } from 'jwt-decode';

interface PlayersProps {
    playerData: PartyScoresType;
}

export const Players = (playerData: PlayersProps) => {
    let currentPlayerUsername = '';
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken') || '';
        const jwtDecoded = jwtDecode(token);
        currentPlayerUsername = jwtDecoded.sub || 'anonymous';
    }

    if (!playerData) {
        return <div>No player data available</div>;
    }

    console.log('playerData', playerData);

    return (
        <Card className="bg-purple-300 w-[100%] md:w-[30%] lg:w-auto lg:h-[50%] rounded-[0.9rem] priority-rounded overflow-hidden">
            <CardTitle className="px-3 py-3 font-medium text-xl">Players</CardTitle>
            <ScrollArea className="h-[15rem] 3xl:h-[15rem] px-4 w-full rounded-md">
                {playerData.playerData?.map((player) => (
                    <div className="flex items-start" key={player.userId}>
                        <Avatar className="border-[1.5px] h-[33px] w-[33px] mr-2">
                            <AvatarImage src={player.profilePicture} />
                            <AvatarFallback>SB</AvatarFallback>
                        </Avatar>
                        <div
                            key={player.userId}
                            className={`flex w-full h-8 justify-between items-center p-4 shadow rounded-full mb-2 ${
                                player.login === currentPlayerUsername ? 'bg-orange-300' : 'bg-white'
                            }`}
                        >
                            <p className="text-left text-sm font-bold">{player.login}</p>
                            {/* <p className="text-right text-[#37034E] text-xl font-bold">{player.nbPoints}</p> */}
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </Card>
    );
};
