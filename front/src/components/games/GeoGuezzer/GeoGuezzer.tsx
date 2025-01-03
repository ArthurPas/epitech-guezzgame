import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import useGameWebSockets from '@/hooks/useGameWebSockets';
import { GameData } from '@/interfaces/gameWebSockets';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useGetDataPictureGeo } from '@/hooks/dataPictureGeo';
import { jwtDecode } from 'jwt-decode';
import WaitForPlayers from '@/components/gameLayout/waitScreen';
import EndGameScore from '@/components/endGameScore';

const Map = dynamic(() => import('./Map'), { ssr: false });

const GeoGuezzer = () => {
    const { isGameOver, isRoundOver, sendToHost, scoreResult, allPlayersReady } = useGameWebSockets();

    // Gestion des modales
    const [showModalRules, setShowModalRules] = useState<boolean>(true);
    const [showModalFeedback, setShowModalFeedback] = useState<boolean>(false);
    const [showReponse, setShowReponse] = useState<boolean>(false);
    const [msgButton, setMsgButton] = useState<string>('Valider position');
    const [roundStartTime, setroundStartTime] = useState<number>(Date.now());
    const [roundFinishTime, setRoundFinishTime] = useState<number>(-1);
    // Logique de jeu
    const [latitudeImage, setLatitudeImage] = useState<number | null>(null);
    const [longitudeImage, setLongitudeImage] = useState<number | null>(null);

    //Gestion des tours
    const [nbTours, setNbTours] = useState<number>(1); // Nombre de tours en cours de jeu
    const nbTotalTours = 3; // Nombre total de tours

    // Récupération des images en début de partie
    const { data, isError, isPending } = useGetDataPictureGeo(nbTotalTours);
    const [images, setImages] = useState<any[]>([]);

    //Gestion fin de jeu
    const [distance, setDistance] = useState<number>(100000);
    const [score, setScore] = useState<number>(0);
    const [showEndGame, setShowEndGame] = useState<boolean>(isGameOver);
    const [waitingForOther, setWaitingForOther] = useState<boolean>(false);

    let userLogin = 'anonymous';

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken') || '';
        const jwtDecoded = jwtDecode(token);
        userLogin = jwtDecoded.sub || 'anonymous';
    }

    let gameData: GameData = {
        from: userLogin,
        date: Date.now(), //TODO: Mettre à jour la date avant l'envoi de gameData
        nbPoints: 0,
        gameName: 'GEO_GUEZZER',
        roundNumber: 0,
        partyCode: localStorage.getItem('partyCode') || '',
        playerInfo: { login: userLogin, timestamp: Date.now() } //TODO: Mettre à jour le timestamp avant l'envoi de gameData
    };

    // Récupération des images à retrouver
    useEffect(() => {
        if (isPending) {
            return;
        }

        if (isError) {
            console.error('Error fetching data');
            return;
        }

        if (data) {
            // Ajouter les nouvelles données au tableau d'images, en s'assurant de ne pas dupliquer les données
            setImages((prevImages) => {
                const updatedImages = [...prevImages, ...data];
                return updatedImages;
            });
        }
    }, [data, isPending, isError]);

    // Evolution de la latitude et la longitude de l'image en cours
    useEffect(() => {
        if (images.length > 0 && images[nbTours - 1]) {
            const [lon, lat] = images[nbTours - 1].geometry.coordinates;
            setLatitudeImage(lat);
            setLongitudeImage(lon);
        } else {
            console.warn('Aucune image disponible pour ce tour.');
        }
    }, [nbTours, images]);

    // Calcul du nombre de kilomètres entre le clic sur la map et l'image
    function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRadians = (degree: number): number => degree * (Math.PI / 180);
        const R: number = 6371; // Rayon de la Terre en kilomètres

        // Conversion des degrés en radians
        const dLat: number = toRadians(lat2 - lat1);
        const dLon: number = toRadians(lon2 - lon1);

        // Calcul de la distance
        const a: number =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Retourne la distance en kilomètres
        return Math.round(R * c);
    }

    // Actions au clic sur la map
    const handleMapClick = (latlng: { lat: number; lng: number }) => {
        if (latitudeImage !== null && longitudeImage !== null) {
            const calculatedDistance = haversineDistance(latitudeImage, longitudeImage, latlng.lat, latlng.lng);

            setDistance(calculatedDistance);
        } else {
            console.warn("Coordonnées de l'image non disponibles.");
        }
    };

    const ValideClick_1Joueur = () => {
        if (showReponse == false) {
            //Valider position

            setScore(() => {
                // /!\ indépendant des autres joueurs
                const findTime = Date.now() - roundStartTime;
                const timeBonus = 1000000 / findTime;
                const newScore = distance < 300 ? (100 * 1000) / distance + timeBonus : 0;
                setRoundFinishTime(Math.round(findTime / 1000));

                return newScore;
            });
            setShowReponse(true);
            setMsgButton('Voir score');
        } else if (showReponse == true) {
            //Voir score
            setShowReponse(false);
            setShowModalFeedback(true);
            setMsgButton('Valider position');
        }
    };

    const handleFeedbackClose = () => {
        handleRoundEnd();
        setroundStartTime(Date.now());
    };

    const handleRoundEnd = async () => {
        gameData.date = Date.now();
        gameData.nbPoints = score;
        gameData.roundNumber = nbTours;
        sendToHost({ actionType: 'ADD_POINTS', gameData });
        if (nbTours < nbTotalTours) {
            setNbTours((prevNbTours) => prevNbTours + 1);
            setShowModalFeedback(false);
            setShowModalFeedback(false);
        } else {
            setShowModalFeedback(false);
            // sendToHost({ actionType: 'PERSONAL_GAME_END', gameData });
            // en attendant ...
            setTimeout(() => {
                sendToHost({ actionType: 'END_GAME', gameData });
            }, 1000);
            setShowEndGame(true);
        }
    };
    if (!allPlayersReady && !showModalRules) {
        return (
            <WaitForPlayers
                from={gameData.from}
                date={gameData.date}
                nbPoints={0}
                gameName={gameData.gameName}
                roundNumber={0}
                partyCode={gameData.partyCode}
                playerInfo={gameData.playerInfo}
            ></WaitForPlayers>
        );
    }
    //Pas encore utilisée (toujour à voir si on garde ou pas)
    if (waitingForOther) {
        if (isGameOver) {
            setWaitingForOther(false);
        }
        return <p>En attente des autres joueurs, t'es tellement rapide aussi tu m'étonne...</p>;
    }

    if (isGameOver) {
        return <EndGameScore login={gameData.playerInfo.login} gameName={gameData.gameName} partyCode={gameData.partyCode} />;
    }
    return (
        <div>
            {/* Modale des règles */}
            {showModalRules && (
                <Dialog open={showModalRules} onOpenChange={() => {}}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center leading-[1.5rem]">Règles du GeoGuezzer</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="text-center text-[16px]">
                            Devinez le lieu exact où vous êtes en vous basant uniquement sur l'environnement de l'image du haut. Plus votre
                            réponse est précise et rapide, plus vous marquez de points ! <br />
                            Attention, une réponse trop éloignée ne rapporte pas de points !
                        </DialogDescription>
                        <DialogFooter>
                            <div className="flex justify-center w-full">
                                <DialogClose asChild>
                                    <Button onClick={() => setShowModalRules(false)}>Jouer</Button>
                                </DialogClose>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Modale de feedback */}
            {showModalFeedback && (
                <Dialog open={showModalFeedback} onOpenChange={() => {}}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">Fin de tour</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="text-center">
                            {distance < 300 ? 'Gagné' : 'Trop loin, pas de points !'} <br />
                            {'Ton score : '}
                            {score} <br />
                            {'Distance : '}
                            {distance}
                            {' km'}
                            <br />
                            {'Trouvé en : '}
                            {roundFinishTime + ' secondes'}
                            <br />
                        </DialogDescription>
                        <DialogFooter>
                            <div className="flex justify-center w-full">
                                <DialogClose asChild>
                                    <Button onClick={handleFeedbackClose}>Suivant</Button>
                                </DialogClose>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Affichage du jeu */}
            {!showModalRules && !showModalFeedback && images.length > 0 && (
                <div className="h-[90vh] flex flex-col m-10">
                    <div className="flex flex-grow">
                        <div className="flex items-center justify-center flex-1 h-[80vh] m-2">
                            <iframe
                                src={`https://www.mapillary.com/embed?image_key=${images[nbTours - 1]?.id}&style=photo`}
                                height="100%"
                                width="100%"
                                title="Mapillary Street View"
                            />

                            <div className="flex items-center justify-center ml-5 mr-5">
                                {latitudeImage !== null && longitudeImage !== null ? (
                                    <Map
                                        onMarkerPositionChange={handleMapClick}
                                        showReponse={showReponse}
                                        imageLocalisation={{ lat: latitudeImage, lng: longitudeImage }}
                                    />
                                ) : (
                                    <p>Loading map...</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center m-8">
                        <Button onClick={ValideClick_1Joueur} className="bg-orange-300">
                            {msgButton}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeoGuezzer;
