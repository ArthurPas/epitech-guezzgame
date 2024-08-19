import React from 'react';

const ResultsDisplay = ({ titles, votes, image }) => {
  return (
    <div className="results-display">
      <h2>Results</h2>
      <img src={image} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
      <ul>
        {titles.map((title, index) => (
          <li key={index}>
            <strong>{title.text}</strong> by {title.author} - {votes[title.text] || 0} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsDisplay;