import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="py-16 px-6 md:px-20 bg-[#fff5e1]">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800" style={{ fontFamily: '"Italiana", sans-serif' }}>
        All Products
      </h1>
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
      )}
    </div>
  );
};

export default Shop;