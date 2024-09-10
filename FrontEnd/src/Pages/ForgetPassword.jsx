import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('/BackEnd/auth/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setMessage('An email has been sent to reset your password.');
      } else {
        setError('Email not found. Please enter a registered email.');
      }
    } catch (error) {
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <p className="text-center mb-4">
          Enter the email associated with your account, and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12l-4-4m0 0l-4 4m4-4v12"
                />
              </svg>
            </span>
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#ffd700] text-white py-2 px-4 rounded-lg uppercase hover:opacity-70 disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {/* Display success or error message */}
        {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <div className="mt-6 text-center">
          <p>
            Remembered your password?{' '}
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Go back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
