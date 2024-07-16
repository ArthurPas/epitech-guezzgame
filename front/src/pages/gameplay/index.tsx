import { Chat } from '@/components/gameLayout/Chat';
import { Players } from '@/components/gameLayout/Players';
import { Card } from '@/components/ui/card';

const Gameplay = () => {
    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row p-4 lg:p-6 gap-2 lg:gap-4 h-[100vh]">
                <div className="flex flex-row  lg:flex-col justify-between w-full lg:w-[20%] gap-2 lg:gap-3 h-[20%] lg:h-[100%] ">
                    <Players />
                    <Chat />
                </div>
                <div className="relative w-full flex flex-col items-center gap-2 h-[100%]">
                    {/* <h1 className="text-amber-300  absolute top-4 text-2xl left-7">Nom</h1> */}
                    <Card className="h-[100%] rounded-[0.9rem] priority-rounded w-full lg:min-w-[98%] bg-purple-700 ">
                        {/* <Players /> */}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Gameplay;
