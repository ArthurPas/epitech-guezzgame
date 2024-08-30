import React, { useState, useEffect } from 'react';
import ImageDisplay from '../../components/titreGame/DisplayPicture';
import TitleInput from '../../components/titreGame/TitleInput';
import TitlesDisplay from '../../components/titreGame/TitleDisplay';
import Voting from '../../components/titreGame/VotingTitle';
import ResultsDisplay from '../../components/titreGame/ResultsDisplay';

interface Title {
  text: string;
  author: string;
}

const Index: React.FC = () => {
  const images: string[] = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMI5kxltdR3KFgBmjDtLtw_0T2oE9PJpvR9A&s',
    'https://i.pinimg.com/736x/76/60/8b/76608be0e55bf6f142bf2ff6bafb465b.jpg',
    'https://i.pinimg.com/736x/a9/ef/a9/a9efa9e0d9a868bf182a920938c0c094.jpg',
  ];

  const [titles, setTitles] = useState<Title[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [ownTitle, setOwnTitle] = useState<string>('');
  const [votes, setVotes] = useState<Record<string, number>>({});
  
  const randomIndex = Math.floor(Math.random() * images.length);

  useEffect(() => {
    if (currentImage === null) {
      setCurrentImage(images[randomIndex]);
    }
  }, [currentImage, images, randomIndex]);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleTitleSubmit = (title: string) => {
    const newTitle: Title = { text: title, author: 'Your Name' };
    setTitles([...titles, newTitle]);
    setOwnTitle(title);
    setStep(3);
  };

  const handleVote = (title: string) => {
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
      {step === 5 && (
  <>
    {console.log('Titles:', titles)}
    {console.log('Votes:', votes)}
    {console.log('Image:', currentImage)}
    <ResultsDisplay titles={titles} votes={votes} image={currentImage} />
  </>
)}
    </div>
  );
};

export default Index;