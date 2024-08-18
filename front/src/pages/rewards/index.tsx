import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useState } from 'react';


const Rewards = () => {

    const [clickedButtonsAnonymes, setClickedButtonsAnonymes] = useState(Array(14).fill(false));
    const [clickedButtonsVIP, setClickedButtonsVIP] = useState(Array(14).fill(false));

    const handleButtonClickAnonymes = (index:number) => {
        const newClickedButtonsAnonymes = [...clickedButtonsAnonymes];
        newClickedButtonsAnonymes[index] = true;
        setClickedButtonsAnonymes(newClickedButtonsAnonymes);
    };

    const handleButtonClickVIP = (index:number) => {
        const newClickedButtonsVIP = [...clickedButtonsVIP];
        newClickedButtonsVIP[index] = true;
        setClickedButtonsVIP(newClickedButtonsVIP);
    };

    return (

        <div className="grid gap-1 min-h-screen w-full justify-center items-center">

            <div className="grid place-items-center mt-20">
                <h1 className="text-amber-300 text-[64px]">Récompenses</h1>
                <br />
                <h3>Rang 6</h3>
            </div>            
            <div>
                <Card className="border w-[1350px] h-[280px] rounded-3xl mx-auto mt-[20px] bg-purple-300 bg-opacity-75 flex justify-center items-center">
                    <CardContent className="p-2 flex flex-col justify-center items-center">
                    <div className="flex w-[1280px] h-[240px] justify-center items-center">
                        <ScrollArea className="h-[255px] w-[100%]">
                            <div className="flex space-x-4">
                                {Array.from({ length: 14 }, (_, index) => {
                                const isDisabled = index + 3 > 6; // Désactiver les boutons au-dessus du rang 6

                                return (
                                    <div key={index}> {/* Clé unique appliquée ici */}
                                         <div className="border-2 rounded-xl bg-white w-[200px] h-[200px] px-2 py-1 text-sm">
                                            <div>
                                                <img
                                                src="https://e7.pngegg.com/pngimages/612/493/png-clipart-shrek-shot-video-film-shrek-face-head.png"
                                                className="h-[130px] rounded-xl"
                                                alt="Description de l'image"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm">Rang {index + 3}</p>
                                                <h4 className="text-xl">Nom de l'asset</h4>
                                                <Button
                                                    className={`mt-5 w-40 ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : clickedButtonsAnonymes[index] ? 'bg-purple-500' : 'bg-amber-400'}`}
                                                    onClick={() => !isDisabled && handleButtonClickAnonymes(index)}
                                                    disabled={isDisabled}
                                                >
                                                    {isDisabled ? 'À débloquer' : clickedButtonsAnonymes[index]? 'Récupéré' : 'Récupérer'}
                                                </Button>
                                              
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
                <h1 className="text-amber-300 text-[64px]">VIP</h1>
            </div>

            <div>
                <Card className="border w-[1350px] h-[280px] rounded-3xl mx-auto mt-[10px] mb-60 bg-purple-300 bg-opacity-75 flex justify-center items-center">
                    <CardContent className="p-2 flex flex-col justify-center items-center">
                    <div className="flex w-[1280px] h-[240px] justify-center items-center">
                        <ScrollArea className="h-[255px] w-[100%]">
                            <div className="flex space-x-4">
                                {Array.from({ length: 14 }, (_, index) => {
                                const isDisabled = index + 3 > 6; // Désactiver les boutons au-dessus du rang 6

                                return (
                                    <div key={index}> {/* Clé unique appliquée ici */}
                                         <div className="border-2 rounded-xl bg-amber-400 w-[200px] h-[200px] px-2 py-1 text-sm">
                                            <div>
                                                <img
                                                src="https://playtv.fr/news/wp-content/uploads/2023/04/Shrek-un-nouveau-film-est-en-preparation-.jpg"
                                                className="h-[130px] rounded-xl"
                                                alt="Description de l'image"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm">Rang {index + 3}</p>
                                                <h4 className="text-xl">Nom de l'asset</h4>
                                                <Button
                                                    className={`mt-5 w-40 ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : clickedButtonsVIP[index] ? 'bg-purple-500' : 'bg-amber-400'}`}
                                                    onClick={() => !isDisabled && handleButtonClickVIP(index)}
                                                    disabled={isDisabled}
                                                >
                                                    {isDisabled ? 'À débloquer' : clickedButtonsVIP[index]? 'Récupéré' : 'Récupérer'}
                                                </Button>
                                              
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
