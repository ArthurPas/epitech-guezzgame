import * as React from "react";
import Playlist from "../playlist/index"; // Assurez-vous que le chemin d'importation est correct
import { CarouselDApiDemo } from "@/components/ui/CarouselDApiDemo";


const BlindTest = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">Blind Test Playlist</h1>
        <CarouselDApiDemo />
      </div>
    </div>
  );
};

export default BlindTest;
