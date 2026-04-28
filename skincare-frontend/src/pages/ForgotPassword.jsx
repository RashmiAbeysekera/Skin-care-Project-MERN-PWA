import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.jpg';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Password updated successfully! You can now log in.');
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Reset error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[85vh] bg-[#fff5e1]">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2">
        <img src={loginImg} alt="Reset Password" data-testid="reset-image" className="w-full h-full object-cover" />
      </div>
      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-[#ebdcc1] flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>Reset Password</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
              <input type="email" id="email" onChange={handleChange} className="w-full px-4 py-3 bg-white/60 border border-gray-400 rounded focus:outline-none focus:border-gray-700" placeholder="Enter your email" required />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="password">New Password</label>
              <input type="password" id="password" onChange={handleChange} className="w-full px-4 py-3 bg-white/60 border border-gray-400 rounded focus:outline-none focus:border-gray-700" placeholder="Enter new password" required />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" onChange={handleChange} className="w-full px-4 py-3 bg-white/60 border border-gray-400 rounded focus:outline-none focus:border-gray-700" placeholder="Confirm new password" required />
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded hover:bg-gray-800 transition duration-300 uppercase tracking-widest text-sm">
              Save Password
            </button>
            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm font-bold text-gray-900 hover:underline">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;