import { refreshAccessToken } from '../../utils/spotify';
import axios from 'axios';

export default async (req, res) => {
  try {
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    const accessToken = await refreshAccessToken(refreshToken);

    const playlistId = '7iKR18IefQLG0dycTMSwBQ';
    const limit = 100;
    let offset = 0;
    let allTracks = [];
    let hasMoreTracks = true;

    while (hasMoreTracks) {
      const spotifyApiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`;

      const response = await axios.get(spotifyApiUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch tracks from Spotify');
      }

      const fetchedTracks = response.data.items.map(item => ({
        preview_url: item.track.preview_url,
        name: item.track.name,
        artist: item.track.artists[0].name,
      }));

      allTracks = allTracks.concat(fetchedTracks);

      // Check if there are more tracks to fetch
      hasMoreTracks = response.data.next !== null;
      offset += limit;
    }

    res.status(200).json(allTracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ error: error.message });
  }
};
