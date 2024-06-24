import React from 'react';

import { Button } from '../../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { ScrollArea } from "@/components/ui/scroll-area"

const friends = [
  {
    name: "Amis 1",
  },
  {
    name: "Amis 2",
  },
  {
    name: "Amis 3",
  },
  {
    name: "Amis 4",
  },
  {
    name: "Amis 5",
  },
  {
    name: "Amis 6",
  },
  {
    name: "Amis 7",
  },
];

const nbGame = 30;
const nbWin = 30;
const vipDays = 30;

const UserProfile: React.FC = () => {
  return (
    <>
      <div className="flex justify-between p-5">
        <Button>Mon profil</Button>
        <Button>Marketplace</Button>
      </div>
      <div className="flex justify-center">
        <div className="text-center">
          <Avatar className="w-48 h-48">
            <AvatarImage src="https://thispersondoesnotexist.com/" />
            <AvatarFallback>Username</AvatarFallback>
          </Avatar>
          <h2 className="mt-4">User</h2>
        </div>
      </div>
      <div className='flex' >
        <div className="bg-purple-300 rounded-lg p-5 w-1/2 mx-auto text-white mt-8" style={{margin: '10px'}}>
          <div className="mb-5">
            <div className="text-lg">Nb de game</div>
            <div className="bg-purple-200 text-purple-600 p-2 rounded text-2xl mt-2">{nbGame}</div>
          </div>
          <div className="mb-5">
            <div className="text-lg">Nb de win</div>
            <div className="bg-purple-200 text-purple-600 p-2 rounded text-2xl mt-2">{nbWin}</div>
          </div>
          <div className="text-lg">
            Vip depuis : <span className="text-pink-400 font-bold">{vipDays}</span> jours !
          </div>
        </div>
        <div className="bg-purple-300 rounded-lg p-5 w-1/2 mx-auto mt-8" style={{ margin: '10px'}}>
          <h2 className="text-center mb-5">Mes amis</h2>
          <ScrollArea>
            {friends.map((friend, index) => (
              <div key={index} className="flex items-center bg-purple-100 mb-4 p-3 rounded-lg">
                <Avatar className="mr-4">
                  <AvatarImage src="https://thispersondoesnotexist.com/" />
                </Avatar>
                <div>{friend.name}</div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
