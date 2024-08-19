import React, { useEffect } from 'react';

const ImageDisplay = ({ images, onNextStep, setCurrentImage, randomIndex }) => {
  useEffect(() => {
    if (images.length) {
      const selectedImage = images[randomIndex];
      setCurrentImage(selectedImage);

      // Set a timeout to automatically go to the next step after 30 seconds
      const timer = setTimeout(onNextStep, 30000);

      // Cleanup the timeout if the component unmounts or if images change
      return () => clearTimeout(timer);
    }
  }, [images, onNextStep, setCurrentImage, randomIndex]);
console.log(randomIndex);
  return (
    
    <div className="flex justify-center items-center h-200 w-200"> 
      { 
        <img src={images[randomIndex]} alt="Selected" className="w-72 h-72 object-cover" />
      }
    </div>
  );
};

export default ImageDisplay;