import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    axios.get('https://ipapi.co/json/')
      .then(response => {
        const countryData = response.data;
        setCountryCode(`${countryData.country_calling_code}`);
      })
      .catch(error => {
        console.error('Error fetching country code:', error);
      });
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('./src/assets/tower.png')` }}>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
        
        <div className="mb-4">
          <button className="w-full bg-slate-200 text-black py-2 px-4 rounded-lg flex items-center justify-center">
            <img src="./src/assets/g.png" alt="Google" className="w-5 h-5 mr-2" />
            Sign Up with Google
          </button>
        </div>

        <div className="mb-4">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center">
            <img src="./src/assets/In.png" alt="LinkedIn" className="w-5 h-5 mr-2" />
            Sign Up with LinkedIn
          </button>
        </div>
        <div className="flex items-center justify-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">Or With Email and Password</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
              placeholder="Username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Phone Number</label>
            <div className="flex">
              <input
                type="text"
                value={countryCode}
                className="w-1/4 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                readOnly
              />
              <input
                type="tel"
                className="w-3/4 px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <button className="w-full bg-[#ffd700] text-white py-2 px-4 rounded-lg">Sign Up</button>
        </form>

        <div className="mt-6 text-center flex gap-4">
          <p>Already have an account?</p>
          <Link to="/sign-in">
            <span className="bg-slate-600 text-white py-1 px-2 rounded-lg cursor-pointer">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
