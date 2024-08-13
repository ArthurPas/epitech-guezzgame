import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, useMap } from "react-leaflet";

interface CustomMarkerProps {
  position: L.LatLngExpression;
  children: React.ReactNode; // Content to display inside the marker
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position, children }) => {

  console.log("le composant CustomMarker est bien rendu");
  //const map = useMap();

  const imageLocation = `/Marqueur2.svg`;

  const customIcon = L.icon({
    iconUrl: imageLocation,
    iconSize: [64, 64],
    iconAnchor: [32, 64],
  });


if (!customIcon.options.iconUrl) {
  console.error("Image du marqueur non chargée. Vérifiez le chemin de l'image.");
}


const handleImageLoad = () => {
  console.log("Image du marqueur chargée avec succès.");
};

const handleImageError = () => {
  console.error("Erreur de chargement de l'image du marqueur.");
};

const img = new Image();
img.src = "/location.png";
img.onload = handleImageLoad;
img.onerror = handleImageError;


  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
};

export default CustomMarker;