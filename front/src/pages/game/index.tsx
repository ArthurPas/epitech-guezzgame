import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

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

const index = () => {
  return (
    <div>
      <div className="flex justify-around py-10">
        <Card className='px-5 py-10'>
            <CardTitle className='text-center py-2'>Joueur :</CardTitle>
      <ScrollArea className=' h-[100px] w-[350px]'>
        <div className="space-y-1">
          {player.map((player)=>(
            <div className="rounded-base border-2 border-border dark:border-darkBorder bg-main px-2 py-1 font-mono text-sm">{player.player} | {player.host}</div>
          ))}
          </div></ScrollArea></Card>
  
      <div className='flex flex-col'>
        <div className='text-center '><h1>nom du jeux</h1></div>
    </div><div><Button className='bg-red-600'>quitter</Button></div>
    </div>
    <div className="flex justify-around py-10">  
    <div>
<Card className="w-[350px] p-5">
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
<Card className='w-[1000px] p-5'></Card>
</div>
    
    
    </div>
  )
}

export default index
