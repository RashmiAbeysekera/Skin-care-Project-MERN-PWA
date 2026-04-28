import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#bcaaa4] text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Corner: Join Community */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: '"Italiana", sans-serif' }}>
              Join our community
            </h3>
            <form className="flex flex-col space-y-3 max-w-sm">
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-2 bg-white/10 border border-white/30 rounded text-white placeholder-gray-200 focus:outline-none focus:border-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 bg-white/10 border border-white/30 rounded text-white placeholder-gray-200 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-gray-900 font-bold rounded hover:bg-gray-200 transition-colors uppercase text-sm tracking-wider"
              >
                Signup
              </button>
            </form>
          </div>

          {/* Right Corner: Links */}
          <div className="flex flex-col md:flex-row md:space-x-16">
            {/* Products Section */}
            <div className="mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider text-white text-sm">Products</h4>
              <ul className="space-y-2">
                <li><Link to="/skincare" className="hover:text-gray-200 text-white transition-colors">Skincare</Link></li>
                <li><Link to="/bodycare" className="hover:text-gray-200 text-white transition-colors">Bodycare</Link></li>
                <li><Link to="/haircare" className="hover:text-gray-200 text-white transition-colors">Haircare</Link></li>
              </ul>
            </div>

            {/* Customer Care Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider text-white text-sm">Customer Care</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-gray-200 text-white transition-colors">Back to Home</Link></li>
                <li>
                  <a href="mailto:rashmiabeysekera3@gmail.com" className="hover:text-gray-200 text-white transition-colors break-all">
                    contact us through rashmiabeysekera3@gmail.com
                  </a>
                </li>
                <li><Link to="/about" className="hover:text-gray-200 text-white transition-colors">About</Link></li>
                <li><Link to="/policies" className="hover:text-gray-200 text-white transition-colors">Company Policies</Link></li>
              </ul>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="mt-12 border-t border-white/20 pt-8 text-center">
          <p className="text-xs tracking-widest uppercase text-white">
            © 2026, DPKA UNIVERSAL CONSUMER VENTURES PVT. LTD. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;