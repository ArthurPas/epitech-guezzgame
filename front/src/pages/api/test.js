import { refreshAccessToken } from '../../utils/spotify';
import axios from 'axios';

export default async (req, res) => {
  try {
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    const accessToken = await refreshAccessToken(refreshToken);

    const playlistId = '3KOnA6CrxNH38AY5BKPOvE';
    const spotifyApiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`;

    const response = await axios.get(spotifyApiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch tracks from Spotify');
    }

    const tracks = response.data.items.map(item => ({
      preview_url: item.track.preview_url,
      name: item.track.name,
      artist: item.track.artists[0].name,
    }));

    res.status(200).json(tracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ error: error.message });
  }
};
