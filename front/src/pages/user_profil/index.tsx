import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { ScrollArea } from "@/components/ui/scroll-area";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const currentUser = {
  name: "Player",
  rank: "200",
  xp: "2.000.000",
  nbGame: "30",
  nbWin: "30",
  vipTime: "30",
};

const friends = [
  { name: "Amis 1" },
  { name: "Amis 2" },
  { name: "Amis 3" },
  { name: "Amis 4" },
  { name: "Amis 5" },
  { name: "Amis 6" },
  { name: "Amis 7" },
];

const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl mb-4">Edit Photo</h2>
        <input type="file" className="mb-4" />
        <div className="flex justify-end">
          <Button onClick={onClose} className="mr-2 bg-[#eec17e]">Cancel</Button>
          <Button onClick={onClose} className='bg-[#eec17e]'>Save</Button>
        </div>
      </div>
    </div>
  );
};

const UserProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between p-5">
        <Button className='bg-[#eec17e]'><a href="/" className='text-[#000000]'>Retour</a></Button>
        <Button className='bg-[#eec17e]'>Marketplace</Button>
      </div>
      <div className="flex justify-center">
        <div className="text-center relative">
          <Avatar className="w-32 h-32 md:w-48 md:h-48 mx-auto">
            <AvatarImage src="https://thispersondoesnotexist.com/" />
            <AvatarFallback>Username</AvatarFallback>
          </Avatar>
          <button
            onClick={handleModalOpen}
            className="absolute top-0 right-0 bg-white p-2 rounded-full shadow-lg"
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <h1 className="mt-4 text-[#eec17e]">{currentUser.name}</h1>
          <h3 className="text-[#eec17e] text-md md:text-lg">Rank: {currentUser.rank} - XP: {currentUser.xp}</h3>
        </div>
      </div>
      <div className="flex flex-col md:flex-row p-5 pb-0 md:m-40 md:mt-0">
        <div className="bg-purple-300 rounded-lg p-5 w-full md:w-1/2 mx-auto text-white mb-5 md:mr-5 md:mb-0">
          <div className="flex justify-around">
            <div className="mb-5 w-48">
              <div className="text-2xl md:text-3xl text-center text-[#37034e]">Games</div>
              <div className="bg-purple-200 text-[#37034e] p-2 rounded text-3xl md:text-4xl mt-2 text-center">{currentUser.nbGame}</div>
            </div>
            <div className="mb-5 w-48">
              <div className="text-2xl md:text-3xl text-center text-[#37034e]">Wins</div>
              <div className="bg-purple-200 text-[#37034e] p-2 rounded text-3xl md:text-4xl mt-2 text-center">{currentUser.nbWin}</div>
            </div>
          </div>
          <div className="text-lg flex justify-center">
            <h3 className='text-[#37034e]'><strong>Vip depuis : <span className="text-pink-400 font-bold">{currentUser.vipTime}</span> jours !</strong></h3>
          </div>
        </div>
        <div className="bg-purple-300 rounded-lg p-5 w-full md:w-1/2 mx-auto md:ml-5">
          <div className="text-2xl md:text-3xl text-center mb-5 text-[#37034e]">Mes amis</div>
          <ScrollArea className="h-72 w-full rounded-md">
            {friends.map((friend, index) => (
              <div key={index} className="flex items-center bg-purple-100 mb-4 p-3 rounded-lg">
                <Avatar className="mr-4">
                  <AvatarImage src="https://thispersondoesnotexist.com/" />
                </Avatar>
                <div className='text-[#37034e]'>{friend.name}</div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleModalClose} />}
    </>
  );
}

export default UserProfile;
