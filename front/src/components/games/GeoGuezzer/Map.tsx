import React, { useState } from "react";
import { MapContainer, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CustomMarker from "./CustomMarker";

interface MapProps {
  onMarkerPositionChange: (position: { lat: number; lng: number }) => void;
}

export default function InteractiveMap({ onMarkerPositionChange }: MapProps) {
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);

  // Composant pour gérer les événements de clic sur la carte
  function ClickableMap() {
    const map = useMap(); // Obtenez une instance de la carte
    useMapEvents({
      click(e) {
        console.log("Carte cliquée : début du traitement");
        console.log("Événement complet :", e);

        const { lat, lng } = e.latlng;
        console.log("Coordonnées cliquées :", { lat, lng });

        setClickedPosition({ lat, lng });
        onMarkerPositionChange({ lat, lng });

        // Déplacez la vue de la carte vers la position cliquée
        map.flyTo(e.latlng, map.getZoom());
      }
    });

    return null;
  }

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '50vh', width: '80vw' }}>
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
    </MapContainer>
  );
}
