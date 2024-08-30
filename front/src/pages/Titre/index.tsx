import React, { useState, useEffect } from 'react';
import ImageDisplay from '../../components/titreGame/DisplayPicture';
import TitleInput from '../../components/titreGame/TitleInput';
import TitlesDisplay from '../../components/titreGame/TitleDisplay';
import Voting from '../../components/titreGame/VotingTitle';
import ResultsDisplay from '../../components/titreGame/ResultsDisplay';


const index = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMI5kxltdR3KFgBmjDtLtw_0T2oE9PJpvR9A&s',
    'https://i.pinimg.com/736x/76/60/8b/76608be0e55bf6f142bf2ff6bafb465b.jpg',
    'https://i.pinimg.com/736x/a9/ef/a9/a9efa9e0d9a868bf182a920938c0c094.jpg',
  ];
  const [titles, setTitles] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [step, setStep] = useState(1);
  const [ownTitle, setOwnTitle] = useState('');
  const [votes, setVotes] = useState({});
  const randomIndex =Math.floor(Math.random() * images.length);
  

  useEffect(() => {
    if (currentImage === null) {
      setCurrentImage(images[randomIndex]);
    }
  }, [currentImage, images, randomIndex]);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const handleTitleSubmit = (title) => {
    const newTitle = { text: title, author: 'Your Name' };
    setTitles([...titles, newTitle]);
    setOwnTitle(title);
    setStep(3);
  };

  const handleVote = (title) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [title]: (prevVotes[title] || 0) + 1,
    }));
    setStep(5);
  };

  return (
    <div className="App">
    {step === 1 && (
      <ImageDisplay
        images={images}
        onNextStep={handleNextStep}
        setCurrentImage={setCurrentImage}
        randomIndex={randomIndex}
      />
    )}
      {step === 2 && <TitleInput onSubmit={handleTitleSubmit} />}
      {step === 3 && <TitlesDisplay titles={titles} image={currentImage} onNextStep={handleNextStep} />}
      {step === 4 && <Voting titles={titles} image={currentImage} ownTitle={ownTitle} onVote={handleVote} />}
      {step === 5 && <ResultsDisplay titles={titles} votes={votes} image={currentImage} />}
    </div>
  );
};

export default index;