
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useGetMeUser } from '@/hooks/userMe';
import { UserMeType } from '@/interfaces/userMe';
import React from 'react';


const Rewards = () => {

    let dataMe;
           
    if (typeof window !== 'undefined') {
        const authToken = localStorage.getItem('authToken') ?? '';     
        ({ data: dataMe } = useGetMeUser(authToken));       
    }
   
   
    let userDataStockees: UserMeType = {
        daySteak: 0,
        id: 0,
        mail: "",
        login: "",
        picture: "",
        nbCoin: 0,
        isVip: false,
        xpPoint: 0,
        level: {
            level: 0,
            badgePictureUrl: []
        }
    };
  
    if (dataMe != null) {      
        userDataStockees = {
            daySteak: dataMe.daySteak ?? 0,
            id: dataMe.id ?? 0,
            mail: dataMe.mail ?? "",
            login: dataMe.login ?? "",
            picture: dataMe.picture ?? "",
            nbCoin: dataMe.nbCoin ?? 0,
            isVip: dataMe.isVip ?? true, 
            xpPoint: dataMe.xpPoint ?? 0,
            level: {
                level: dataMe.level?.level ?? 0,
                badgePictureUrl: dataMe.level?.badgePictureUrl ?? "",
            }
        };
    }
   
    //Mise à jour des récompenses gagnées 
    let coins_gagnes =  userDataStockees.nbCoin;

    coins_gagnes = coins_gagnes + 10*(userDataStockees.daySteak);

    if(userDataStockees.isVip == true)
    {        
          coins_gagnes = coins_gagnes + 50*(userDataStockees.daySteak);
    }

    userDataStockees.nbCoin = coins_gagnes;
  
  return (
        <div className="grid gap-1 min-h-screen w-full justify-center items-center">
            <div className="grid place-items-center mt-20">
                <h1 className="text-amber-400 text-[64px]">Récompenses</h1>
                <br />
                <h3>{coins_gagnes} coins gagnés aujourd'hui - {userDataStockees.daySteak} jour(s)de connexion d'affilés</h3>
            </div>            

            <div>
                <Card className="border w-[80vw] h-[280px] rounded-3xl mx-auto mt-[20px] bg-purple-300 bg-opacity-75 flex justify-center items-center">
                    <CardContent className="p-2 flex flex-col justify-center items-center">
                        <div className="flex w-[64vw] h-[240px] justify-center items-center">
                            <ScrollArea className="h-[230px] w-[100%]">
                                <div className="flex space-x-4">
                                    {Array.from({ length: 11 }, (_, index) => {
                                        const nbJours = userDataStockees.daySteak;
                                        const isGray = index <= nbJours; 
                                        return (
                                            <div key={index}>
                                                <div className={`border-2 rounded-xl w-60 h-[200px] px-2 py-1 text-sm ${isGray ? 'bg-purple-500' : 'bg-white'}`}>
                                                    <div className='flex justify-center items-center'>
                                                        <img
                                                            src="/coin.png"

                                                            className="h-[130px] rounded-xl"
                                                            alt="Description de l'image"
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-sm">Jour {index}</p>
                                                        <h4 className="text-xl">{(index+1) * 10} coins</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid place-items-center mt-[60px]">
                <h1 className="text-amber-400 text-[64px]">VIP</h1>
            </div>
            <div>
                <Card className="border w-[80vw] h-[280px] rounded-3xl mx-auto mt-[10px] mb-40 bg-purple-300 bg-opacity-75 flex justify-center items-center">
                    <CardContent className="p-2 flex flex-col justify-center items-center">
                        <div className="flex w-[64vw] h-[240px] justify-center items-center">
                            <ScrollArea className="h-[230px] w-[100%]">
                                <div className="flex space-x-4">
                                    {Array.from({ length: 11 }, (_, index) => {
                                        const nbJours = userDataStockees.daySteak;
                                        const isGray = index <= nbJours;
                                        return (
                                            <div key={index}>
                                                <div className={`border-2 rounded-xl w-60 h-[200px] px-2 py-1 text-sm ${isGray ? 'bg-purple-500' : 'bg-amber-400'}`}>
                                                    <div className='flex justify-center items-center'>
                                                        <img
                                                            src="/coin.png"
                                                            className="h-[130px] rounded-xl"
                                                            alt="Description de l'image"
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-sm">Jour {index}</p>
                                                        <h4 className="text-xl">{(index+1) * 50} coins</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Rewards;
