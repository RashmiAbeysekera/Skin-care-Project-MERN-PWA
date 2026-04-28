import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const SkinCare = () => {
  // Filter data to only show skincare items
  const skincareProducts = products.filter(product => product.category === 'skincare');

  return (
    <div className="py-16 px-6 md:px-20 bg-[#fff5e1]">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>Skincare Collection</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skincareProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SkinCare;