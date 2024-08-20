import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CustomMarker from "./CustomMarker";
import dynamic from "next/dynamic";
import L from "leaflet";

// Composant dynamique pour DrawRoute
const DrawRoute = dynamic(() => import('./drawRoute'), { ssr: false });
const DrawCircle = dynamic(() => import('./drawCircle'), { ssr: false });

interface MapProps {
  onMarkerPositionChange: (position: { lat: number; lng: number }) => void; // Destination
  imageLocalisation: { lat: number; lng: number }; // Source
  showReponse: boolean;
}

export default function InteractiveMap({ onMarkerPositionChange, showReponse, imageLocalisation }: MapProps) {
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Composant pour gérer les événements de clic sur la carte
  function ClickableMap() {
    const map = useMap(); 
    mapRef.current = map;

    useMapEvents({
      click(e) {
        if (showReponse) {
          return;
        }

        console.log("Carte cliquée : début du traitement");
        console.log("Événement complet :", e);

        const { lat, lng } = e.latlng;
        console.log("Coordonnées cliquées :", { lat, lng });

        setClickedPosition({ lat, lng });
        onMarkerPositionChange({ lat, lng });

        map.flyTo(e.latlng, map.getZoom());
      }
    });

    return null;
  }

  useEffect(() => {
    if (clickedPosition && showReponse) {
      const bounds = L.latLngBounds([
        [imageLocalisation.lat, imageLocalisation.lng],
        [clickedPosition.lat, clickedPosition.lng],
      ]);
      mapRef.current?.fitBounds(bounds);
    }
  }, [clickedPosition, showReponse, imageLocalisation]);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '80vh', width: '30vw' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickableMap />
      {clickedPosition && (
        <CustomMarker position={clickedPosition}>
          <Popup>Vous avez cliqué ici</Popup>
        </CustomMarker>
      )}
      {showReponse && clickedPosition && (
        <>
          <DrawRoute
            source={[imageLocalisation.lat, imageLocalisation.lng]}
            destination={[clickedPosition.lat, clickedPosition.lng]}
          />
          <DrawCircle 
            imageLocalisation={imageLocalisation} 
            radius={300000}  
            color="purple"
          />
          <DrawCircle 
            imageLocalisation={imageLocalisation} 
            radius={30}  
            color="red" 
          />
        </>
      )}
    </MapContainer>
  );
}
