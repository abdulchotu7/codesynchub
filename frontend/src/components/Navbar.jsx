import React from 'react';
import { Link } from 'react-router-dom';
import { CgHome, CgLogOut } from 'react-icons/cg';
import { LuLogIn } from 'react-icons/lu';
import { PiRainbowCloudBold } from 'react-icons/pi';
import { auth } from '../config/firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

function Navbar() {
  const [user, loading, error] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center">
              <PiRainbowCloudBold className="text-red-500 text-3xl mr-2" />
              MyApp
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600">
              <CgHome className="text-2xl" />
              <span>Home</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600">
              <span>Profile</span>
            </Link>
            <Link to="/send" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600">
              <span>Send</span>
            </Link>
            <Link to="/display" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600">
              <span>Display</span>
            </Link>
            {user ? (
              <>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
                >
                  <CgLogOut className="text-2xl" />
                  <span>Logout</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-800">
                  <span>{user.displayName}</span>
                  <img 
                    src={user.photoURL} 
                    alt="User Avatar" 
                    className="w-8 h-8 rounded-full object-contain"
                  />
                </div>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600">
                <LuLogIn className="text-2xl" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
