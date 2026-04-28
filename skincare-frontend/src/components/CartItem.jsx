import React from 'react';
import { useCart } from '../context/CartContext'; // Assuming CartContext is in src/context

const CartItem = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCart();

  const itemId = item._id || item.id;

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveClick = () => {
    removeItem(itemId);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
        <div>
          <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
          <p className="text-gray-600">Rs. {item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input type="number" min="1" value={item.quantity} onChange={handleQuantityChange} className="w-16 px-2 py-1 border rounded text-center" />
        <button onClick={handleRemoveClick} className="text-red-500 hover:text-red-700">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;