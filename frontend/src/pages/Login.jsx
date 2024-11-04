import React from 'react';
import { BsGoogle } from 'react-icons/bs';
import { auth, provider } from '../firebaseconfig';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-6">Sign in Here</h1>
        <button 
          onClick={login} 
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          <BsGoogle className="text-xl" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
