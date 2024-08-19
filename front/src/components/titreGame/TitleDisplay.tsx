import React, { useState, useEffect } from 'react';

const TitlesDisplay = ({ titles, image, onNextStep }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex + 1 === titles.length) {
          clearInterval(interval);
          onNextStep(); // Passer à l'étape suivante après avoir affiché tous les titres
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [titles, onNextStep]);

  return (
    <div className="flex flex-col items-center">
      <img src={image} alt="Random" className="max-w-full max-h-full mb-4" />
      <div className="bg-gray-200 p-2 m-2 rounded shadow">
        {titles[currentIndex].text}
      </div>
    </div>
  );
};

export default TitlesDisplay;