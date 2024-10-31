'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FaGoogle, FaTwitter, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

type AuthFormProps = {
  mode: 'signup' | 'login';
};

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: '', password: '', confirmPassword: '' };

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (mode === 'signup' && !confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password && (!newErrors.confirmPassword || mode === 'login')) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-6 text-3xl font-semibold text-center">E-Academy</h1>

      <div className="w-full max-w-sm p-6 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-center">{mode === 'signup' ? 'Create an account' : 'Login'}</h2>
        <p className="text-sm text-center text-gray-600">
          {mode === 'signup'
            ? 'Enter your credentials to create your account'
            : 'Enter your credentials to access your account'}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <FaEnvelope className="absolute right-3 top-9 text-gray-400" />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {mode === 'signup' && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              </div>
            ) : (
              mode === 'signup' ? 'Create an account' : 'Login'
            )}
          </button>

          {errors.email || errors.password || errors.confirmPassword ? (
            <div className="mt-2">
              {errors.email && <p className="text-sm text-black bg-red-300 border-background rounded-md py-2 pl-2">{errors.email}</p>}
              {errors.password && <p className="text-sm text-black bg-blue-300 border-background rounded-md py-2 pl-2 mt-2">{errors.password}</p>}
              {errors.confirmPassword && <p className="text-sm text-black bg-blue-300 border-background rounded-md py-2 pl-2 mt-2">{errors.confirmPassword}</p>}
            </div>
          ) : null}
        </form>

        <div className="flex items-center justify-between my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-sm text-gray-500">Or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <button className="flex items-center justify-center w-full px-4 py-2 mb-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
          <FaGoogle className="mr-2 text-red-500" /> Continue with Google
        </button>
        <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
          <FaTwitter className="mr-2 text-blue-400" /> Continue with Twitter
        </button>

        <p className="text-sm text-center text-gray-600">
          {mode === 'signup' ? (
            <>
              Already here{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </>
          ) : (
            <>
              Are you new here?{' '}
              <Link href="/" className="text-blue-600 hover:underline">
                Create Account
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
