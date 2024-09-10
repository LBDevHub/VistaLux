import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'; 

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/BackEnd/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/profile');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url('./src/assets/luxu.png')` }}
    >
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        <div className="mb-4">
          <button className="w-full bg-slate-200 text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center">
            <img
              src="./src/assets/g.png"
              alt="Google"
              className="w-5 h-5 mr-2 font-bold"
            />
            Google
          </button>
        </div>
        <div className="mb-4">
          <button className="w-full bg-slate-200 text-black font-bold py-2 px-4 rounded-lg flex items-center justify-center">
            <img
              src="./src/assets/In.png"
              alt="LinkedIn"
              className="w-5 h-5 mr-2 font-bold"
            />
            LinkedIn
          </button>
        </div>
        <div className="flex items-center justify-between my-6">
          <hr className="w-full border-black" />
          <span className="px-4 items-center text-black">OR</span>
          <hr className="w-full border-black" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-black">
              <AiOutlineMail size={20} />
            </span>
          </div>
          <div className="relative mb-2">
            <input
              type="password"
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
              placeholder="Enter your password"
              id="password"
              onChange={handleChange}
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-black">
              <AiOutlineLock size={20} />
            </span>
          </div>
          
          <div className="text-right mb-4">
            <Link to="/forget-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#ffd700] text-white py-2 px-4 rounded-lg uppercase hover:opacity-70 disabled:opacity-60"
          >
            {loading ? 'Loading...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center flex gap-4">
          <p>Don't have an account?</p>
          <Link to="/sign-up">
            <span className="bg-slate-600 text-white py-1 px-2 rounded-lg cursor-pointer">
              Sign Up
            </span>
          </Link>
        </div>

        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
