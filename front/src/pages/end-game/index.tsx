import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState, useEffect } from 'react';

import { useGetDataEndGame } from '@/hooks/dataEndGame';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface FriendsData {
  id: number;
  pseudo: string;
  score: number;
}

//------------------------------------------------------------
  //Ajouter la logique pour récupérer l'utilisateur en cours
//------------------------------------------------------------
const idCurrentPlayer: number = 9;

const Index = () => {
  const [position, setPosition] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<FriendsData | null>(null);
  const [playerData, setPlayerData] = useState<FriendsData[]>([]);
  const { data, isError, isPending } = useGetDataEndGame();

  useEffect(() => {
  console.log("data : ", data);
  if (data && data.scores && Array.isArray(data.scores)) {
    const mappedScores = data.scores.map((score) => ({
      id: score.userId,
      pseudo: score.login,
      score: score.nbPoints
    }));      

      //Tri par ordre décroissant
      const sortedScores = [...mappedScores];      
      sortedScores.sort((a, b) => b.score - a.score);  
    
      setPlayerData(sortedScores);
  } else {
    console.error("Les données reçues ne sont pas au format attendu ou ne contiennent pas de scores.", data);
  }
}, [data]);

  useEffect(() => {
    console.log("playerData :", playerData);

    const getPosition = () => {
      let tempCurrentPlayer: FriendsData | null = null;
      let pos = 1;

      playerData.forEach(player => {
        if (player.id === idCurrentPlayer) {
          setCurrentPlayer(player);
          tempCurrentPlayer = player;

          playerData.forEach(player => {
            if (player.score > tempCurrentPlayer!.score) {
              pos++;
            }
          });
        }
      });     

      setPosition(pos);     
    };

    if (playerData.length > 0) {
      getPosition();
    }
  }, [playerData]);

  if (isPending) {
    return <span>Chargement...</span>;
  }

  if (isError) {
    return <span>Erreur lors du chargement des données.</span>;
  }

  if (position === null || !currentPlayer) {
    console.error('Position player is null or currentPlayer is null');
    return null;
  }

  return (
    <div className='grid gap min-h-screen w-full'>
      <div className='grid place-items-center'>
        <h1 className='text-amber-300 text-[64px]'>Fin de partie</h1>
      </div>

      <div className='mt-[2.5rem]'>
        <Card className='border-[1.5px] w-[25%] h-[90px] rounded-3xl mx-auto mb-8 bg-purple-300 bg-opacity-75'>
          <CardContent className='p-2 flex flex-col justify-center items-center rounded-3xl space-y-1'>            
            <h2 className="title-small text-center font-semibold">Tu es {position}ème !</h2>
            <h2 className="title-small font-bold text-amber-400 text-shadow mb-2">+{currentPlayer.score}pts</h2>
          </CardContent>
        </Card>

        <Card className='w-[50%] h-[60%] mx-auto rounded-[4rem] mb-5 flex flex-col justify-center bg-purple-300 bg-opacity-75'>
          <CardContent className='p-2 max-h-52 overflow-y-auto flex flex-col justify-center items-center mx-4'>
            
          <ScrollArea className="h-72 px-4 w-full rounded-md">
            {playerData.map((player) => (
              <div key={player.id} className="flex items-start mb-2">
                <Avatar className="border-[1.5px] h-[33px] w-[33px] mr-2">
                  <AvatarImage src={'https://res.cloudinary.com/dxaqv2hww/image/upload/v1720513515/shrek_4_vnuik2.webp'} />
                  <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <div className={`flex w-full h-8 justify-between items-center p-4 shadow rounded-full ${player.id === currentPlayer?.id ? 'bg-orange-300' : 'bg-white'}`}>
                  <p className="text-left text-sm font-bold">{player.pseudo}</p>
                  <p className="text-right text-[#37034E] text-xl font-bold">{player.score}</p>
                </div>
              </div>
            ))}
          </ScrollArea>

          </CardContent>
        </Card>
      </div>

      <div className="grid place-items-center">
          <Button className=" bg-orange-300 mb-10">Terminer la partie</Button>
      </div>

    </div>
  );
};

export default Index;
