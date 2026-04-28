import React from 'react';
import { Link } from 'react-router-dom';
import deepikaImg from '../assets/home.jpg';
import skincareImg from '../assets/skincare.jpg';
import bodycareImg from '../assets/bodycare.jpg';
import haircareImg from '../assets/haircare.jpg';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Reviews from '../components/Reviews';

const LandingPage = () => {
  // Get best-selling products
  const bestSellers = products.filter(p => p.isBestSeller);

  return (
    <div className="min-h-screen">
      <div className="w-full h-[600px] relative">
        <img src={deepikaImg} alt="Deepika" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-end px-6 md:px-20">
          <div className="max-w-lg text-right text-white drop-shadow-lg">
            <p className="text-xl md:text-2xl font-semibold italic mb-6 leading-relaxed">
              "With 7°Skin, I hope to inspire us all to connect with our truest, most authentic selves through consistent and humble self-care practices."
            </p>
            <p className="text-sm font-bold tracking-widest">- FOUNDER, RASHMI ABEYSEKERA.</p>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-8">
        <div className="relative w-1/3 h-80 group">
          <img src={skincareImg} alt="Skincare" className="w-full h-full object-cover brightness-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to="/skincare" className="text-white text-4xl font-bold tracking-wider hover:underline" style={{ fontFamily: '"Arial Narrow", sans-serif' }}>Skincare</Link>
          </div>
        </div>
        <div className="relative w-1/3 h-80 group">
          <img src={bodycareImg} alt="Bodycare" className="w-full h-full object-cover brightness-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to="/bodycare" className="text-white text-4xl font-bold tracking-wider hover:underline" style={{ fontFamily: '"Arial Narrow", sans-serif' }}>Bodycare</Link>
          </div>
        </div>
        <div className="relative w-1/3 h-80 group">
          <img src={haircareImg} alt="Haircare" className="w-full h-full object-cover brightness-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to="/haircare" className="text-white text-4xl font-bold tracking-wider hover:underline" style={{ fontFamily: '"Arial Narrow", sans-serif' }}>Haircare</Link>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="py-16 px-6 md:px-20 bg-[#fff5e1]">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>
          Best Sellers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Brand Review Section */}
      <Reviews />
    </div>
  );
};

export default LandingPage;