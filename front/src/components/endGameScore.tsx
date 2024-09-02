import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useRouter } from "next/router";


interface Score {
    login: string;
    score: number;
}

interface EndGameScoreProps {
    scoreResult: Score[];
    login: string;
}

const EndGameScore: React.FC<EndGameScoreProps> =  ({ scoreResult, login }) => {
    const router = useRouter();

    const navigateRoom = () => {
        router.push('/room');
    }
    
  return (<div className="grid gap min-h-screen w-full">
    <div className="grid place-items-center">
        <h1 className="text-amber-300 text-[64px]">Fin de partie</h1>
    </div>

    <div className="mt-[2.5rem]">
      
    <Card className="w-[50%] h-[60%] mx-auto rounded-[4rem] mb-5 flex flex-col justify-center bg-purple-300 bg-opacity-75">
        <CardContent className="p-2 max-h-52 overflow-y-auto flex flex-col justify-center items-center mx-4">
            <ScrollArea className="h-72 px-4 w-full rounded-md mt-[1vh]">
                {scoreResult
                    .sort((a, b) => b.score - a.score)
                    .map((player) => {                                
                        const backgroundColorClass = player.login === login ? "bg-amber-300" : "bg-white";
                        return (
                            <div key={player.login} className="flex items-start mb-2">   
                                <div className={`flex w-full h-8 justify-between items-center p-4 shadow rounded-full ${backgroundColorClass}`}> 
                                    <p className="text-left text-sm font-bold">{player.login}</p>
                                    <p className="text-right text-[#37034E] text-xl font-bold">{player.score}</p>
                                </div>
                            </div>
                        );
                    })}
            </ScrollArea>
        </CardContent>
    </Card>
    </div>

    <div className="grid place-items-center">
        <Button className=" bg-orange-300 mb-10" onClick={navigateRoom}>Terminer la partie</Button>
    </div>
</div>);
};

export default EndGameScore;
