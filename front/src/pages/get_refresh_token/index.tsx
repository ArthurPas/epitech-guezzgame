import React from 'react';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const SCOPE = 'user-read-private user-read-email';

const handleLogin = () => {
    if (CLIENT_ID && REDIRECT_URI) {
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
            SCOPE
        )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
        window.location.href = authUrl;
    } else {
        console.error('Missing environment variables');
    }
};

const IndexPage = () => {
    return (
        <div>
            <h1>Login with Spotify</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default IndexPage;
