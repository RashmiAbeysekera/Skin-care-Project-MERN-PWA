import React from 'react';
import { Link } from 'react-router-dom';
import CartSidebar from './CartSidebar'; // Assuming CartSidebar.jsx is in the same directory
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar'; // Import the new SearchBar component

const Navbar = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <nav className="bg-[#efe1c7] shadow-md">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');`}
      </style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-4xl font-bold text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>7°Skin</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <SearchBar /> {/* Integrate the SearchBar component here */}
              <Link to="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/shop" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
              <Link to="/about" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              {/* Removed Contact tab */}
              <div className="flex items-center space-x-4"> {/* Group icons for alignment */}
                <div className="relative">
                  <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-black/5 transition-colors" aria-label="Shopping Cart">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                  </button>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full pointer-events-none">
                      {cartCount}
                    </span>
                  )}
                </div>
                <Link to="/login" className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-black/5 transition-colors" aria-label="Sign In">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
    </nav>
  );
};

export default Navbar;
