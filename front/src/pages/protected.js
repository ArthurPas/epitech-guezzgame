// pages/protected.js
import React from 'react';
import axios from 'axios';
import cookie from 'cookie';

const Protected = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.display_name}</h1>
      <img src={user.images[0].url} alt="User avatar" />
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const accessToken = cookies.spotify_access_token || null;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return {
      props: {
        user: response.data
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default Protected;
