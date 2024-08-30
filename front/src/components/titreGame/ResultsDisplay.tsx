import React from 'react';

const ResultsDisplay = ({ titles, votes, image }) => {
  return (
    <div className="results-display flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <img src={image} alt="Selected" className="max-w-full h-auto mb-6" />
      <ul className="list-disc list-inside">
        {titles.map((title, index) => (
          <li key={index} className="mb-2">
            <div className="bg-gray-100 p-3 rounded-md shadow-md">
              <strong className="text-lg text-gray-800">{title.text}</strong> by 
              <span className="text-gray-700"> {title.author}</span> - 
              <span className="text-blue-500 font-semibold"> {votes[title.text] || 0} votes</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsDisplay;