import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState, useEffect } from 'react';

interface FriendsData {
  id: number;
  pseudo: string;
  score: number;
}


// Renvoyer l'id de la room

const playerData: FriendsData[] = [
  { id: 1, pseudo: 'player1', score: 300 },
  { id: 2, pseudo: 'player2', score: 250 },
  { id: 3, pseudo: 'player3', score: 200 },
  { id: 4, pseudo: 'player4', score: 150 },
  { id: 5, pseudo: 'player5', score: 100 },
  { id: 6, pseudo: 'player6', score: 50 },
  { id: 7, pseudo: 'player7', score: 10 },
];

const idCurrentPlayer: number = 3;

const Index = () => {
  const [position, setPosition] = useState<number | null>(null);
  const [positionPlayer, setPositionPlayer] = useState<FriendsData | null>(null);
  
  
  useEffect(() => {
    const getPosition = () => {
      let currentPlayer: FriendsData | null = null;
      let index = 0;
      let pos = 0;

      playerData.forEach(player => {
        index++;
        if (player.id === idCurrentPlayer) {
          currentPlayer = player;
          pos = index;
        }
      });

      setPosition(pos);
      setPositionPlayer(currentPlayer);
    };

    getPosition();
  }, []);

  if (positionPlayer === null) {
    console.error('Position player is null');
    return null;
  }

  return (

    <div className='grid gap min-h-screen w-full'>
        
      <div className='grid place-items-center'>
        <h1 className='title-medium mt-9'>Fin de partie</h1>
      </div>

      <Card className='w-1/3 h-[80px] rounded-full mx-auto bg-white'>
        <CardContent className='p-2'>
          <div className='grid place-items-center'>
            <div className='flex flex-col justify-center items-center rounded-full p-1 space-y-1'>
              <h2 className='title-small text-center'>Tu es {position}ème</h2>
              <h2 className='title-small font-bold text-orange-400'>+{positionPlayer.score}pts</h2>
            </div>
          </div>
        </CardContent>
      </Card>
        
    
      <Card className='w-1/2 mx-auto bg-white bg-opacity-70 rounded-lg mb-5 flex flex-col justify-center '>
        <CardContent className='p-2 max-h-52 overflow-y-auto flex flex-col justify-center items-center'>      

        <ScrollArea className="h-72 px-4 w-full rounded-md ">
          {playerData.map(player => (
            <div
              key={player.id}
              className={`flex w-full h-8 justify-between items-center p-4 shadow rounded-full mb-2 ${player.id === idCurrentPlayer ? 'bg-orange-300' : 'bg-white'}`}
            >
              <h1 className="text-left text-blue-900 text-sm font-bold">{player.pseudo}</h1>
              <h1 className="text-right text-blue-900 text-xl font-bold">{player.score}</h1>
            </div>
          ))}
           </ScrollArea>
        </CardContent>
      </Card>
     

      <div className='grid place-items-center'>
        <Button className='w-1/3 bg-orange-300 mb-10'>Terminer la partie</Button>
      </div>
  </div>
  );
};

export default Index;
