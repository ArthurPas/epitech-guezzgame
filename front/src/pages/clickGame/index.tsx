// components/Game.js
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
const bonuses = [
  { type: 'Bonus', points: 5 },
  { type: 'Bonus', points: 10 },
  { type: 'Malus', points: -5 },
  { type: 'Malus', points: -10 }
];

const getRandomItem = (array: string | any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = (array: (string | any)[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const getRandomPosition = (maxWidth: number, maxHeight: number) => {
  const x = Math.floor(Math.random() * maxWidth);
  const y = Math.floor(Math.random() * maxHeight);
  return { x, y };
};

const isOverlapping = (pos1: { x: number; y: number; }, pos2: { x: number; y: number; }, size = 50) => {
  const distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
  return distance < size;
};

const Game = () => {
  const [targetItem, setTargetItem] = useState('');
  const [shuffledItems, setShuffledItems] = useState<string[]>([]);
  const [log, setLog] = useState<{ login: string; timestamp: number; }[]>([]);
  const [countdown, setCountdown] = useState(5);
  const [isWaiting, setIsWaiting] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    setNewRound();
  }, []);

  useEffect(() => {
    if (isWaiting) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setIsWaiting(false);
        setRound(round + 1);
        setNewRound();
      }
    }
  }, [countdown, isWaiting]);

  const setNewRound = () => {
    setTargetItem(getRandomItem(items));
    setShuffledItems(shuffleArray([...items]));
    setCountdown(5);
  };

  const handleClick = (item: string) => {
    const timestamp = Date.now();
    const playerInfo = { login: 'andy', timestamp };

    if (item === targetItem) {
      console.log('Correct item clicked!', playerInfo);
      let points = 10;
      if (round % 2 === 0 || round % 3 === 0) {
        const bonusOrMalus = getRandomItem(bonuses);
        points += bonusOrMalus.points;
        console.log(`${bonusOrMalus.type} applied: ${bonusOrMalus.points} points!`, playerInfo);
      }
      setLog((prevLog) => [...prevLog, playerInfo] as { login: string; timestamp: number; }[]);
      setScore((prevScore) => prevScore + points);
      setIsWaiting(true);
    } else {
      console.log('Wrong item clicked!', playerInfo);
    }
  };

  const getNonOverlappingPosition = (existingPositions: any[], maxWidth: number, maxHeight: number) => {
    let position: { x: number; y: number; };
    let isOverlappingAny;
    do {
      position = getRandomPosition(maxWidth, maxHeight);
      isOverlappingAny = existingPositions.some((existingPosition) => isOverlapping(existingPosition, position));
    } while (isOverlappingAny);
    return position;
  };

  const handleStartGame = () => {
    setModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <div className="flex flex-col items-center justify-center p-6">
            <h2 className="text-xl font-bold mb-4">Click Game</h2>
            <p>
              Les règles du Click Game sont simples : Vous devez cliquer sur l'item correct aussi rapidement que possible.
            </p>
            <br />
            <h2 className="text-xl font-bold">Système de points :</h2>
            <ul className="p-4">
              <li>Cliquez sur l'item correct pour gagner 10 points.</li>
              <li>À chaque manche, un bonus ou un malus aléatoire peut être appliqué au score.</li>
              <li>Un bonus peut ajouter 5 ou 10 points supplémentaires.</li>
              <li>Un malus peut retirer 5 ou 10 points.</li>
            </ul>
            <Button
              onClick={handleStartGame}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Commencer le Click Game
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <h1>Find the item: {targetItem}</h1>
        <h2>Score: {score}</h2>
      </div>
      <Card style={{ position: 'relative', width: '600px', height: '600px', border: '2px solid black', padding: '20px' }}>
        <div style={{ position: 'absolute', top: '50px', left: '10px' }}>
          {isWaiting ? <h2>Next round in: {countdown}s</h2> : null}
        </div>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {shuffledItems.map((item, index) => {
            const positions = shuffledItems.slice(0, index).map((_, i) => getRandomPosition(500, 500));
            const { x, y } = getNonOverlappingPosition(positions, 500, 500);
            return (
              <Button
                key={item}
                onClick={() => !isWaiting && handleClick(item)}
                style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}
                disabled={isWaiting}
                className='bg-[#eec17e]'
              >
                {item}
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Game;