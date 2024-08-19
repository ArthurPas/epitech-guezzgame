import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

const TitleInput = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onSubmit(title);
    }
  }, [timeLeft, title, onSubmit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title);
  };

  return (
    <div className="flex flex-col justify-center items-center h-200 w-200">
      <form onSubmit={handleSubmit} className="w-72 h-72 object-cover">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Write a title for the image
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <p>Time left: {timeLeft} seconds</p>
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className='bg-amber-500'
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TitleInput;