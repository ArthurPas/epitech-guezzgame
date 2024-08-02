
import React, { useEffect, useState } from 'react';
import Map from "./Map";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import EndGame from '@/pages/end-game';

const GeoGuezzer = () => {

    const [latitudeImage, setLatitudeImage] = useState<number | null>(null);
    const [longitudeImage, setLongitudeImage] = useState<number | null>(null);
    const [distance, setDistance] = useState<number>(100000);
    const [nbImage, setNbImage] = useState<number>(1);

    //Logique de jeu
    const [nbTours, setNbTours] = useState<number>(1);
    const [score, setScore] = useState<number>(0);


    //API
    const token = 'MLY|7972898332774780|a736b008c14ff5587858c9e0cfc23f05';    
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

    //Actions au clic sur la map
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
    
      //Récupération des images à retrouver
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
    
        fetchImageDetails();
      }, [nbImage, keys, token]);


  const ValideClick_1Joueur = () => {
    
    // Afficher la distance actuelle
    console.log("Distance : ", distance);
    setNbTours(nbTours+1);
    
    setScore(prevScore => {
      // Calculer le nouveau score
      const newScore = distance < 60 ? prevScore + 300 : prevScore;
      
      // Afficher un message en console en fonction de la distance
      if (distance < 50) {
        console.log("Gagné !");
      } else {
        console.log("Perdu !");
      } 
            
        // Incrémenter le nombre d'images ou revenir au début de la liste
        setNbImage(prevNbImage => (prevNbImage === keys.length - 1 ? 0 : prevNbImage + 1));
        
      console.log("Score :", newScore);
      return newScore;

    });
  };

  if (nbTours > 3) {
    // Afficher uniquement le composant EndGame lorsque nbTours > 3
    return <EndGame />;
}

    return (
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
                <Button onClick={ValideClick_1Joueur} className=" bg-orange-300 mb-10">Valider la position</Button>
            </div>

            {nbTours > 3 && <EndGame />}
        </div>
     
    );
};

export default GeoGuezzer;
