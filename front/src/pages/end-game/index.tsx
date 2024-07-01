import { Button } from '@/components/ui/button';
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
];

const idCurrentPlayer: number = 4;

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
    <div className='grid gap bg-fuchsia-700 min-h-screen w-full'>


  <div className='grid place-items-center'>
    <h1 className='title-medium mt-10'>Fin de partie</h1>
  </div>


  <div className='grid place-items-center'>
    <div className='w-1/4 h-[70px] bg-white bg-opacity-70 flex flex-col justify-center items-center rounded-full p-1 space-y-1'>
      <h2 className='title-small text-center'>Tu es {position}ème</h2>
      <h2 className='title-small font-bold text-orange-400'>+{positionPlayer.score}pts</h2>
    </div>
  </div>

     
  <div className='grid place-items-center'>
    <div className='w-1/3 bg-white bg-opacity-70 flex flex-col justify-center items-center p-4 rounded'>
      {playerData.map(player => (
        <div
          key={player.id}
          className={`flex w-full h-10 justify-between items-center p-4 shadow rounded-full ${
            player.id === idCurrentPlayer ? 'bg-orange-300' : 'bg-white'
          }`} >

          <h1 className="text-left text-blue-900 text-sm font-bold">{player.pseudo}</h1>
          <h1 className="text-right text-blue-900 text-xl font-bold">{player.score}</h1>

        </div>
      ))}
    </div>
  </div>
      <div className='grid place-items-center'>
        <Button className='w-1/3 bg-orange-300 mb-10'>Terminer la partie</Button>
      </div>
    </div>
  );
};

export default Index;
