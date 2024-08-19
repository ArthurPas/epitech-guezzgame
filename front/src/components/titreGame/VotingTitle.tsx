import React from 'react';

const Voting = ({ titles, image, ownTitle, onVote }) => {
  return (
    <div className="voting-display">
      <h2>Vote for the Best Title</h2>
      <img src={image} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
      <ul>
        {titles.map((title, index) => (
          <li key={index}>
            <button onClick={() => onVote(title.text)}>
              {title.text} by {title.author}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voting;