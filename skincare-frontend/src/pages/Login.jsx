import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Save user data to localStorage so other components can access it
        localStorage.setItem('user', JSON.stringify(data.user));
        alert(`Welcome back, ${data.user.firstName}!`);
        navigate('/'); // Redirect to home
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[85vh]">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2">
        <img src={loginImg} alt="Login" className="w-full h-full object-cover" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-[#ebdcc1] flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>Welcome to 7°Skin</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
              <input type="email" id="email" onChange={handleChange} className="w-full px-4 py-3 bg-white/60 border border-gray-400 rounded focus:outline-none focus:border-gray-700" placeholder="Enter your email" required />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="password">Password</label>
              <input type="password" id="password" onChange={handleChange} className="w-full px-4 py-3 bg-white/60 border border-gray-400 rounded focus:outline-none focus:border-gray-700" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded hover:bg-gray-800 transition duration-300 uppercase tracking-widest text-sm">
              Sign In
            </button>
            <div className="mt-6 text-center space-y-4">
              <div><Link to="/forgot-password" data-testid="forgot-password-link" className="text-sm text-gray-700 hover:text-black hover:underline">Forgot Password?</Link></div>
              <div className="text-sm text-gray-700">Don't have an Account? <Link to="/register" className="font-bold text-gray-900 hover:underline">Sign Up</Link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;