import React from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div>
      <Navbar />
      {user ? (
        <h2>Welcome!</h2>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

export default Home;
