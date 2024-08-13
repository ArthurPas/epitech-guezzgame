import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

// Définition des types pour les props du composant
interface RouteProps {
  source: [number, number]; // [latitude, longitude]
  destination: [number, number]; // [latitude, longitude]
}

const DrawRoute: React.FC<RouteProps> = ({ source, destination }) => {
  const map = useMap();

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${source[1]},${source[0]};${destination[1]},${destination[0]}?overview=full`
        );
        if (!response.ok) {
          throw new Error(`Error fetching route: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data || !Array.isArray(data.waypoints)) {
          throw new Error("Invalid data format");
        }

        const coordinates = data.waypoints.map((waypoint: { location: [number, number] }) => [
          waypoint.location[1],
          waypoint.location[0],
        ]);
        console.log("coordinates", coordinates);
        L.polyline(coordinates, { color: "red" }).addTo(map);
      } catch (error) {
        console.error("Failed to fetch route:", error);
      }
    };

    fetchRoute();
  }, [source, destination, map]);

  return null;
};

export default DrawRoute;
