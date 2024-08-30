import React from 'react';

const Voting = ({ titles, image, ownTitle, onVote }) => {
  return (
    <div className="voting-display text-center">
      <h2 className="text-2xl font-bold mb-4">Vote for the Best Title</h2>
      <div className="flex justify-center mb-4">
        <img src={image} alt="Selected"  className="w-72 h-72 object-cover" />
      </div>
      <ul className="list-none space-y-2">
        {titles.map((title, index) => (
          <li key={index}>
            <button 
              onClick={() => onVote(title.text)} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              {title.text} by {title.author}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voting;