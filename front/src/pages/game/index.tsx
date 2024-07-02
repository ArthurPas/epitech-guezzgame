import { ScrollArea , ScrollBar} from '@/components/ui/scroll-area'
  const player = [
    {
      player: 'player 1',
      host:"host"
    },
    {
      player: 'player 2',
    },
    {
      player: 'player 2',
    },
    {
      player: 'player 2',
    },
   
  ]

  const game = [
    {
      name:'game1',
      picture:""
    },
    {
      name:'game2',
      picture:""
    },
    {
      name:'game3',
      picture:""
    },
    {
      name:'game4',
      picture:""
    },
    {
      name:'game5',
      picture:""
    },
    {
      name:'game6',
      picture:""
    }
  ]
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/RoomTab'
import React from 'react'

import { useState } from 'react';



const index = () => {
  const [playlistGames, setPlaylistGames] = useState([]);

  const handleAddGame = (game: { name: string; picture: string }) => {
    if (!playlistGames.includes(game)) {
      setPlaylistGames([...playlistGames, game]);
    }
  };
  return ( 
    
    <div>
    <div className="flex justify-around py-10">
      <div><Button className='bg-amber-500'>retour</Button></div>
      <div className='flex flex-col'>
        <div className='text-center '><h1>GuezGame</h1></div>

    
    <div className='flex flex-row'>
    <ScrollArea className="h-[80px] w-[520px]">
              <div className="flex space-x-4">
                {Array(14).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-base border-2 border-border dark:border-darkBorder bg-main px-2 py-1 font-mono text-sm"
                  >
                    <h4>day{index + 1}</h4>
                    <h3>+100</h3>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea></div>
 </div>

      <div><Button className='bg-amber-500'>Profils</Button></div></div>
  
      <div className="flex justify-around py-10">  
  <div>
   <Tabs defaultValue="create" className="w-[800px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="create">Crée une room</TabsTrigger>
    <TabsTrigger value="join">rejoindre une room</TabsTrigger>
  </TabsList>
  <TabsContent value="create">
    <Card>      
      <CardContent className="flex space-y-5 space-x-10">
        <div className="flex-auto">
        <div className="space-y-1">
          <Label htmlFor="roomname">Nom de la room:</Label>
          <Input id="roomname" defaultValue="Party-1" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="idroom">ID de la room:</Label>
          <div className="rounded-base border-2 border-border dark:border-darkBorder bg-white px-2 py-1 font-mono text-m">HRFTUZ</div>
        </div>
        <Label htmlFor="player">Player:</Label>
        <ScrollArea className=' h-[100px] w-[350px]'>
        <div className="space-y-1">
          {player.map((player)=>(
            <div className="rounded-base border-2 border-border dark:border-darkBorder bg-main px-2 py-1 font-mono text-sm">{player.player} | {player.host}</div>
          ))}
          </div></ScrollArea></div>
  
          <div className='flex space-x-5'>
                    <div className='flex flex-col'>
                      <Label htmlFor="Game">Game:</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {game.map((game) => (
                          <Button key={game.name} className='default' onClick={() => handleAddGame(game)}>{game.name}</Button>
                        ))}
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <Label htmlFor="playlistGame">Playlist Game:</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {playlistGames.map((game, index) => (
                          <Button key={index} className='default'>{game.name}</Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
      <CardFooter>
        <Button
          variant="default"
          className="w-full bg-amber-500 text-text dark:bg-darkBg dark:text-darkText"
        >
          play !
        </Button>
      </CardFooter>
    </Card>
  </TabsContent>
  <TabsContent value="join">
    <Card>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="current">Room ID</Label>
          <Input id="current" type="join" />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          className="w-full bg-amber-500 text-text dark:bg-darkBg dark:text-darkText"
        >
        join
        </Button>
      </CardFooter>
    </Card>
  </TabsContent>
</Tabs>
</div>

<div>
<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Chat</CardTitle>
  </CardHeader>
  <CardContent>
  <Input className="w-[200px]" type="message" placeholder=".  .  ." />
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button className="bg-amber-500" variant="default">send</Button>
  </CardFooter>
</Card>
</div>
    </div></div>
  )

}

export default index
