import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import EndGame from '@/pages/end-game';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

const Map = dynamic(() => import('./Map'), { ssr: false }); // Dynamically import Map to disable SSR

const GeoGuezzer = () => {
    // Gestion des modales
    const [showModalRules, setShowModalRules] = useState<boolean>(true);
    const [showModalFeedback, setShowModalFeedback] = useState<boolean>(false);

    // Fin du jeu
    const [showEndGame, setShowEndGame] = useState<boolean>(false);

    // Logique
    const [latitudeImage, setLatitudeImage] = useState<number | null>(null);
    const [longitudeImage, setLongitudeImage] = useState<number | null>(null);
    const [distance, setDistance] = useState<number>(100000);
    const [nbImage, setNbImage] = useState<number>(1);

    // Logique de jeu
    const [nbTours, setNbTours] = useState<number>(1);
    const [score, setScore] = useState<number>(0);

    // API
    const token = '';
    const keys = ['926837688198923', '550092599700936', '304829904534967'];

    // Calcul du nombre de kilomètres entre le clic de la map et celui de l'image
    function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRadians = (degree: number): number => degree * (Math.PI / 180);
        const R: number = 6371; // Rayon de la Terre en kilomètres
        const dLat: number = toRadians(lat2 - lat1);
        const dLon: number = toRadians(lon2 - lon1);
        const a: number =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance en kilomètres
    }

    // Actions au clic sur la map
    const handleMapClick = (latlng: { lat: number; lng: number }) => {
        console.log('Position du clic événement EcranDeJeu:', latlng);

        if (latitudeImage !== null && longitudeImage !== null) {
            const calculatedDistance = haversineDistance(
                latitudeImage,
                longitudeImage,
                latlng.lat,
                latlng.lng
            );
            setDistance(calculatedDistance);
            console.log('Distance fin de méthode de calcul:', calculatedDistance);
        }
    };

    // Récupération des images à retrouver
    useEffect(() => {
        const fetchImageDetails = async () => {
            try {
                const response = await axios.get(`https://graph.mapillary.com/${keys[nbImage]}?access_token=${token}`);
                const imageData = response.data;

                if (imageData.geometry && imageData.geometry.coordinates) {
                    const [lon, lat] = imageData.geometry.coordinates;
                    setLatitudeImage(lat);
                    setLongitudeImage(lon);
                }
            } catch (error) {
                console.error('Error fetching image details:', error);
            }
        };

        if (typeof window !== 'undefined') {
            fetchImageDetails();
        }
    }, [nbImage, keys, token]);

    const ValideClick_1Joueur = () => {
        console.log("Distance : ", distance);
        setNbTours(nbTours + 1);

        setScore(prevScore => {
            // Calculer le nouveau score
            const newScore = distance < 60 ? prevScore + 300 : prevScore;

            if (distance < 100) {
                console.log("Gagné !");
            } else {
                console.log("Perdu !");
            }

            console.log("Score :", newScore);
            return newScore;
        });

        // Ouvrir la modale de feedback après la validation
        setShowModalFeedback(true);
    };

    const handleFeedbackClose = () => {
        if (nbTours > keys.length) {
            setShowModalFeedback(false);
            setShowEndGame(true);
        } else {
            setShowModalFeedback(false);
            setNbImage(prevNbImage => (prevNbImage === keys.length - 1 ? 0 : prevNbImage + 1));
        }
    };

    if (showEndGame) {
        return <EndGame />;
    }

    return (
        <div>
            {/* Modale des règles */}
            {showModalRules && (
                <Dialog open={showModalRules} onOpenChange={() => { }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='text-center'>Règles du jeu</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className='text-center'>
                            Devinez le lieu exact où vous êtes en vous basant uniquement sur l'environnement de l'image du haut. Plus votre réponse est précise et rapide, plus vous marquez de points ! <br/>
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
                <Dialog open={showModalFeedback} onOpenChange={() => { }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='text-center'>Retour</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className='text-center'>
                            {distance < 100 ? "Gagné" : "Perdu"} <br />
                            {"Ton score : "}{score} <br />
                            {"Distance : "}{distance} <br />
                        </DialogDescription>
                        <DialogFooter>
                            <div className="flex justify-center w-full">
                                <DialogClose asChild>
                                    <Button onClick={handleFeedbackClose}>
                                        Suivant
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Affichage du jeu */}
            {!showModalRules && !showModalFeedback && (
                <div>
                    <div className="flex items-center justify-center h-[30vh] m-8">
                        <iframe
                            src={`https://www.mapillary.com/embed?image_key=${keys[nbImage]}&style=photo`}
                            height="100%"
                            width="100%"
                            title="Mapillary Street View"
                        />
                    </div>
                    <div className="flex items-center justify-center m-8 rounded-full">
                        <Map onMarkerPositionChange={handleMapClick} />
                    </div>
                    <div className="flex justify-center m-8">
                        <Button onClick={ValideClick_1Joueur} className="bg-orange-300 mb-10">Valider la position</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeoGuezzer;
