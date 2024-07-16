import { Chat } from '@/components/gameLayout/Chat';
import { Players } from '@/components/gameLayout/Players';
import { Card } from '@/components/ui/card';

const Gameplay = () => {
    return (
        <>
            <div className="flex p-12 gap-2 h-[100vh]">
                <div className="flex flex-col w-[20%] gap-4">
                    <Players />
                    <Chat />
                </div>
                <div className="w-full flex justify-center flex-col items-center gap-2">
                    <h1 className="text-amber-300 text-[64px] font-Bangers w-[96%]">NOM DU JEU</h1>
                    <Card className="aspect-video rounded-[1.2rem] min-w-[98%] bg-purple-700 ">{/* <Players /> */}</Card>
                </div>
            </div>
        </>
    );
};

export default Gameplay;
