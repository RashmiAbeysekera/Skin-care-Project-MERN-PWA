import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        }),
      });
      
      if (response.ok) {
        setShowModal(true);
      } else {
        const data = await response.json();
        alert(data.message || 'Registration failed. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText('REG10');
    alert('Code REG10 copied to clipboard!');
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[85vh] relative">
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full text-center transform transition-all scale-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to 7°Skin family!</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for signing up with us — your journey to healthier, glowing skin starts here.
            </p>
            <div className="bg-[#fff5e1] p-6 rounded-lg border border-[#ebdcc1] mb-6">
              <p className="text-gray-800 font-medium mb-2">As a token of our appreciation, here’s your exclusive reward:</p>
              <div className="flex items-center justify-between bg-white border border-gray-300 rounded px-4 py-2 mt-2">
                <span className="font-bold text-xl tracking-wider text-gray-900">REG10</span>
                <button onClick={copyCode} className="text-sm text-blue-600 hover:text-blue-800 font-semibold uppercase">Copy Code</button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Use this code to enjoy 10% discount on your first purchase.</p>
            </div>
            <p className="text-gray-700 italic mb-8">Don’t miss out — treat your skin to the care it deserves.</p>
            <button onClick={handleModalClose} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full transition duration-300 flex items-center justify-center mx-auto">
              <span className="mr-2">OK</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Left Side - Image */}
      <div className="w-full md:w-1/2">
        <img src={loginImg} alt="Register" className="w-full h-full object-cover" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-[#ebdcc1] flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>Welcome to 7°Skin</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-1" htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" onChange={handleChange} className="w-full px-4 py-2 bg-white/60 border border-gray-400 rounded focus:outline-none focus:border-gray-700" required />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-1" htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" onChange={handleChange} className="w-full px-4 py-2 bg-white/60 border border-gray-400 rounded focus:outline-none focus:border-gray-700" required />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-1" htmlFor="email">Email</label>
              <input type="email" id="email" onChange={handleChange} className="w-full px-4 py-2 bg-white/60 border border-gray-400 rounded focus:outline-none focus:border-gray-700" required />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} id="password" onChange={handleChange} className="w-full px-4 py-2 bg-white/60 border border-gray-400 rounded focus:outline-none focus:border-gray-700" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-semibold mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" onChange={handleChange} className="w-full px-4 py-2 bg-white/60 border border-gray-400 rounded focus:outline-none focus:border-gray-700" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-start">
                <input type="checkbox" id="news" className="mt-1 mr-2 accent-gray-800" />
                <label htmlFor="news" className="text-sm text-gray-700">Keep me up to date on news</label>
              </div>
              <div className="flex items-start">
                <input type="checkbox" id="terms" className="mt-1 mr-2 accent-gray-800" />
                <label htmlFor="terms" className="text-sm text-gray-700">*I agree to 7°Skin Terms & Conditions and Privacy policy</label>
              </div>
            </div>

            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 mt-6 rounded hover:bg-gray-800 transition duration-300 uppercase tracking-widest text-sm">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;