import React, { useState } from 'react';
import { auth } from '../firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios'; 
import Navbar from '../components/Navbar';

function Display() {
  const [user, loading, error] = useAuthState(auth);
  const [jsonData, setJsonData] = useState(null);
  const [fetching, setFetching] = useState(false);

  const fetchData = async () => {
    if (user) {
      setFetching(true);
      try {
        // Replace with your API endpoint
        const response = await axios.get(`http://localhost:5000/api/v1/cp/display/${user.uid}`);
        setJsonData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setFetching(false);
      }
    } else {
      console.error('User is not authenticated');
    }
  };

  return (
    <>
     <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : user ? (
        <>
          <button 
            onClick={fetchData} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
          >
            Fetch Data
          </button>
          {fetching && <p className="mt-4 text-gray-500">Fetching...</p>}
          {jsonData && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-2">Fetched Data</h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(jsonData, null, 2)}
              </pre>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">Please log in to view data.</p>
      )}
    </div>
    </>

  );
}

export default Display;
