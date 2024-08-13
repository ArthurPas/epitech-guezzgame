import React from 'react';
import { Circle } from 'react-leaflet';

interface ImageLocationCircleProps {
  imageLocalisation: { lat: number; lng: number };
  radius: number; 
  color: string;
}

const DrawCircle: React.FC<ImageLocationCircleProps> = ({ imageLocalisation, radius, color }) => {
  return (
    <Circle
      center={[imageLocalisation.lat, imageLocalisation.lng]}
      radius={radius}
      pathOptions={{ color, fillColor: color }}
    />
  );
};

export default DrawCircle;
