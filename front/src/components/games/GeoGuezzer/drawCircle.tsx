import React from 'react';
import { Circle } from 'react-leaflet';

interface ImageLocationCircleProps {
  imageLocalisation: { lat: number; lng: number }; // Coordonnées du centre
  radius: number; // Rayon du cercle en mètres
  color: string;  // Couleur du cercle
}

const DrawCircle: React.FC<ImageLocationCircleProps> = ({ imageLocalisation, radius, color }) => {
  return (
    <Circle
      center={[imageLocalisation.lat, imageLocalisation.lng]}  // Coordonnées du centre
      radius={radius}  // Rayon du cercle
      pathOptions={{ color, fillColor: color }}  // Options de style
    />
  );
};

export default DrawCircle;
