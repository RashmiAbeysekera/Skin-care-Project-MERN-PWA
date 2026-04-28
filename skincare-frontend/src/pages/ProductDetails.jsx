import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// import { products } from '../data/products'; // No longer needed

const ProductDetails = () => {
  const { id } = useParams(); // Get the ID from the URL (e.g., 1 from /product/1)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-2xl">Loading product...</div>;
  if (error) return <div className="text-center py-20 text-2xl text-red-500">Error: {error.message}</div>;
  if (!product) return <div className="text-center py-20 text-2xl">Product not found!</div>;

  return (
    <div className="container mx-auto px-4 py-16 bg-[#fff5e1] min-h-screen">
       <Link to="/shop" className="text-gray-600 mb-8 block hover:underline">&larr; Back to Shop</Link>
       
       <div className="flex flex-col md:flex-row gap-10">
         {/* Left: Image */}
         <div className="w-full md:w-1/2">
           <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
         </div>

         {/* Right: Details */}
         <div className="w-full md:w-1/2">
           <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: '"Italiana", sans-serif' }}>{product.name}</h1>
           
           {product.subtitle && <p className="text-sm text-gray-600 mb-4">{product.subtitle}</p>}

           <div className="text-sm text-gray-700 space-y-1 mb-4">
             {product.skinType && <p><strong>Skin Type :</strong> {product.skinType}</p>}
             {product.size && <p><strong>Size :</strong> {product.size}</p>}
           </div>

           <p className="text-2xl text-gray-700 font-semibold">Rs. {product.price.toFixed(2)}</p>
           {product.mrpNote && <p className="text-xs text-gray-500 mb-6">{product.mrpNote}</p>}
           
           <button 
             onClick={() => addItem(product)}
             className="bg-stone-800 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-stone-700 transition uppercase mb-6"
           >
             ADD TO CART
           </button>

           {product.shippingInfo && <p className="text-xs text-gray-600 mb-6">{product.shippingInfo}</p>}

           {product.certifications && (
             <div className="flex flex-wrap gap-2 mb-8">
               {product.certifications.map((cert, index) => (
                 <span key={index} className="text-[10px] border border-stone-400 px-2 py-1 rounded text-stone-600 font-semibold">
                   {cert}
                 </span>
               ))}
             </div>
           )}

           <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              {product.ingredients && (
                <div>
                  <h3 className="font-bold mb-2 uppercase">Ingredients</h3>
                  <p className="text-xs">{product.ingredients}</p>
                </div>
              )}
              {product.fullDescription && (
                <div>
                  <h3 className="font-bold mb-2 uppercase">Description</h3>
                  <p className="whitespace-pre-line">{product.fullDescription}</p>
                </div>
              )}
              {product.benefits && (
                <div>
                  <h3 className="font-bold mb-2 uppercase">Benefits</h3>
                  <p className="whitespace-pre-line">{product.benefits}</p>
                </div>
              )}
              {product.howToUse && (
                <div>
                  <h3 className="font-bold mb-2 uppercase">How to use</h3>
                  <p>{product.howToUse}</p>
                </div>
              )}
              {product.storage && (
                <div>
                  <p className="whitespace-pre-line text-xs italic mt-4">{product.storage}</p>
                </div>
              )}
           </div>
         </div>
       </div>
    </div>
  );
};

export default ProductDetails;
