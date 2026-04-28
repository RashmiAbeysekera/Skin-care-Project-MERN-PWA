import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Assuming CartContext is in src/context
import CartItem from './CartItem'; // Assuming CartItem is in the same directory
import PayHereButton from './PayHereButton';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');

  // Get the actual logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || { firstName: "Guest" };
  const isLoggedIn = user.firstName !== "Guest";

  const handleApplyDiscount = () => {
    if (!isLoggedIn) {
      setDiscountMessage('Please log in to use a discount code.');
      return;
    }

    // Check if the user has already used this discount (backend should track this)
    if (user.isFirstOrderDiscountUsed) {
      setDiscountMessage('You have already used your first-order discount.');
      return;
    }

    if (discountCode.toUpperCase() === 'REG10') {
      setAppliedDiscount(0.10); // 10%
      setDiscountMessage('Congratulations! You got 10% off for your first order.');
    } else {
      setDiscountMessage('Invalid discount code.');
      setAppliedDiscount(0);
    }
  };

  const discountedTotal = cartTotal * (1 - appliedDiscount);

  const sidebarClasses = `fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  }`;

  return (
    <div className={sidebarClasses}>
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100vh-280px)]"> {/* Adjusted height to fit discount section */}
        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center mt-8">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => <CartItem key={item._id || item.id} item={item} />)
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-200 bg-gray-50">
        {/* Discount Code Section */}
        <div className="mb-4">
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Discount Code" 
              className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:border-gray-600"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button 
              onClick={handleApplyDiscount}
              className="bg-gray-800 text-white px-4 py-2 rounded text-xs font-bold hover:bg-gray-700 transition"
            >
              APPLY
            </button>
          </div>
          {discountMessage && (
            <p className={`text-[11px] mt-2 font-medium ${appliedDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {discountMessage}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-6">
          <div className="flex flex-col">
            <span>Total:</span>
            {appliedDiscount > 0 && <span className="text-xs text-gray-400 line-through font-normal">Rs. {cartTotal.toFixed(2)}</span>}
          </div>
          <span className={appliedDiscount > 0 ? 'text-green-600' : ''}>
            Rs. {discountedTotal.toFixed(2)}
          </span>
        </div>
        
        <PayHereButton 
          orderDetails={{ 
            totalAmount: discountedTotal, 
            itemName: appliedDiscount > 0 ? "7°Skin Order (Discounted)" : "7°Skin Order" 
          }}
          user={user} 
        />
      </div>
    </div>
  );
};

export default CartSidebar;