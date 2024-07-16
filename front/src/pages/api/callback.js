// pages/api/callback.js
import axios from 'axios';

export default async (req, res) => {
  const code = req.query.code || null;
  
  if (!code) {
    res.status(400).json({ error: 'Authorization code not provided' });
    return;
  }

  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
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
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri
    }
  };

  try {
    const response = await axios(authOptions);
    const { access_token, refresh_token } = response.data;

    // Stockez le refresh token en toute sécurité, par exemple dans une base de données
    // Pour l'exemple, nous l'envoyons simplement en réponse
    res.status(200).json({ access_token, refresh_token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
};
