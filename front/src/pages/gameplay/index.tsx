import { Chat } from '@/components/gameLayout/Chat';
import { Players } from '@/components/gameLayout/Players';
import { GuessGame } from '@/components/games/guessGame/guessGame';
import { Card } from '@/components/ui/card';
import { CarouselDApiDemo } from '@/components/ui/CarouselDApiDemo';

const Gameplay = () => {
    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row p-4 lg:p-6 gap-2 lg:gap-4 h-[100vh]">
                <div className="flex flex-row  lg:flex-col justify-between w-full lg:w-[20%] gap-2 lg:gap-3 h-[20%] lg:h-[100%] ">
                    <Players />
                    <Chat />
                </div>
                <div className="w-full flex justify-center flex-col items-center gap-2">
                    <h1 className="text-amber-300 text-[64px] font-Bangers w-[96%]">NOM DU JEU</h1>
                    <Card className="aspect-video rounded-[1.2rem] min-w-[98%] max-h-[100vh] bg-purple-700">
                        <CarouselDApiDemo />
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Gameplay;
