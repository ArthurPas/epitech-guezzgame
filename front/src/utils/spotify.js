import axios from 'axios';

export const refreshAccessToken = async (refreshToken) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
  };

  try {
    const response = await axios(authOptions);
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to refresh access token');
  }
};

export const getUserAlbums = async (accessToken) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user albums: ' + response.statusText);
    }

    return response.data.items;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch albums data from Spotify');
  }
};
