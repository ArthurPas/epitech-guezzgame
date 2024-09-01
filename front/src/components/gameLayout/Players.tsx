import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { playerData } from '@/lib/mocks/player';

export const Players = () => {
    const idCurrentPlayer: number = 3;

    return (
        <Card className="bg-purple-300 w-[100%] md:w-[30%] lg:w-auto lg:h-[50%] rounded-[0.9rem] priority-rounded overflow-hidden">
            <CardTitle className="px-3 py-3 font-medium text-xl">Players</CardTitle>
            <ScrollArea className="h-[15rem] 3xl:h-[15rem] px-4 w-full rounded-md">
                {playerData.map((player) => (
                    <div className="flex items-start" key={player.id}>
                        <Avatar className="border-[1.5px] h-[33px] w-[33px] mr-2">
                            <AvatarImage src={'https://res.cloudinary.com/dxaqv2hww/image/upload/v1720513515/shrek_4_vnuik2.webp'} />
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
        </Card>
    );
};
