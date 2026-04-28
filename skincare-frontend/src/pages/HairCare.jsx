import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const HairCare = () => {
  // Filter data to only show haircare items
  const haircareProducts = products.filter(product => product.category === 'haircare');

  return (
    <div className="py-16 px-6 md:px-20 bg-[#fff5e1]">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>Haircare Collection</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {haircareProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HairCare;