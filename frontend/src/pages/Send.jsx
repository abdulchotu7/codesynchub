import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '../config/firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  Codechef: yup.string().url('Must be a valid URL'),
  Leetcode: yup.string().url('Must be a valid URL'),
});

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newdata = {
      u_name: user.uid,
      ...data
    };

    try {
      const response = await axios.post("http://localhost:5000/api/v1/cp/fill", newdata);
      if (response.status === 200) {
        console.log('Form submitted successfully:', response.data);
        // Only navigate after successful submission
        navigate('/');
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Profile Form</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input 
                type="text" 
                placeholder='Enter name' 
                {...register('name')} 
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Codechef</label>
              <input 
                type="text" 
                placeholder='Enter Codechef profile link' 
                {...register('Codechef')} 
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 ${errors.Codechef ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.Codechef && <p className="text-red-500 text-xs mt-1">{errors.Codechef.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Leetcode</label>
              <input 
                type="text" 
                placeholder='Enter Leetcode profile link' 
                {...register('Leetcode')} 
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 ${errors.Leetcode ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.Leetcode && <p className="text-red-500 text-xs mt-1">{errors.Leetcode.message}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
            >
              Submit
            </button>

          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <h1>Please Login</h1>
        </div>
      )}
    </>
  );
}

export default Form;
