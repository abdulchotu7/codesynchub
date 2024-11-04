import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseconfig';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div>
      <Navbar/>
      {user ? (
        <h2>Profile Page of {user.email}</h2>
      ) : (
        <h1>Please log in to see profile</h1>
      )}
    </div>
  );
};

export default Profile;
