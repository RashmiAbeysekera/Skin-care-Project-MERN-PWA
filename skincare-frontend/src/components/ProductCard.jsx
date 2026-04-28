import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const productId = product._id || product.id;

  return (
    <div className="bg-[#f8f0e3] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${productId}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </Link>

      <div className="p-4 text-center">
        <Link to={`/product/${productId}`}>
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-800 font-semibold">Rs. {product.price.toFixed(2)}</p>
        </Link>

        <button
          className="mt-4 block w-full text-center bg-stone-800 text-white py-2 rounded hover:bg-stone-700 transition"
          onClick={() => addItem(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
