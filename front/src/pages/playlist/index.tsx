import { useEffect, useState } from 'react';
import axios from 'axios';

const Playlist = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get('/api/test');
        setTracks(response.data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div>
      <h1>Playlist Tracks</h1>
      {tracks.length > 0 ? (
        <ul>
          {tracks.map((track, index) => (
            <li key={index}>
              <p>{track.name} - {track.artist}</p>
              {track.preview_url ? (
                <audio controls>
                  <source src={track.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p>No preview available</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Playlist;
