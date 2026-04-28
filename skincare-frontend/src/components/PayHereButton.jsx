import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const PayHereButton = ({ orderDetails, user }) => {
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // This will log every time the component shows up on your screen
  useEffect(() => {
    console.log("PayHere ready with:", { orderDetails, user });
  }, [orderDetails, user]);

  const handleCheckout = async (e) => {
    console.log("Button click detected!");
    if (!orderDetails || !user) {
      alert("Error: Button exists but 'orderDetails' or 'user' props are empty!");
      return;
    }

    if (e) e.preventDefault(); // Stop page from refreshing

    try {
      setLoading(true);
      
      // Validation: Ensure we have the data we need
      if (!orderDetails || !user) {
        console.error("Missing Data:", { orderDetails, user });
        alert("Checkout Error: Missing order or user information.");
        return;
      }

      const orderId = "TEST_" + Date.now();
      // Try totalAmount first, then fall back to price (from products.js)
      const amount = orderDetails.totalAmount || orderDetails.price;
      const currency = "LKR";

      // 1. Get the security hash from your backend
      console.log("NETWORK: Contacting backend for security hash...", { orderId, amount });
      const response = await fetch('http://localhost:5000/api/payment/generate-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, amount, currency })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to connect to payment server");
      }

      const { hash, merchantId } = await response.json();
      console.log("SUCCESS: Hash received successfully:", hash);

      // 2. Prepare the payment object for PayHere
      const formattedAmount = Number(amount || 0).toFixed(2);

      const payment = {
        sandbox: true, // Set to false in production
        merchant_id: merchantId,
        return_url: window.location.origin + '/payment-success',
        cancel_url: window.location.origin + '/payment-cancelled',
        notify_url: 'http://your-domain.com/api/payment/notify', // Use a real URL for webhooks later
        order_id: orderId,
        items: orderDetails.itemName || "Skincare Products",
        amount: formattedAmount, // Must match the hash format (e.g. 100.00)
        currency: currency,
        hash: hash,
        first_name: user.firstName || "Customer",
        last_name: user.lastName || 'Customer',
        email: user.email || "test@example.com",
        phone: user.phone || '0112345678',
        address: 'No. 1, Main Street',
        city: 'Colombo',
        country: 'Sri Lanka',
      };

      // 3. Create a hidden form and submit it to PayHere
      console.log("REDIRECT: Data ready. Redirecting to PayHere Sandbox...");
      const form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('action', 'https://sandbox.payhere.lk/pay/checkout');

      Object.keys(payment).forEach(key => {
        const hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('id', `payhere_${key}`);
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', payment[key]);
        form.appendChild(hiddenField);
      });

      document.body.appendChild(form);

      // Safety check: Clear the cart items in the frontend context if the function exists
      if (typeof clearCart === 'function') {
        clearCart();
      }

      // If a discount was applied, mark it as used in localStorage to prevent re-use
      if (orderDetails.itemName && orderDetails.itemName.includes("(Discounted)")) {
        const updatedUser = { ...user, isFirstOrderDiscountUsed: true };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      console.log("FINAL: Form submitted to PayHere.");
      form.submit();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(`Checkout Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      style={{
        backgroundColor: loading ? '#999' : '#eb624c',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontWeight: 'bold',
        transition: '0.3s'
      }}
    >
      {loading ? 'Processing...' : 'Proceed to Checkout'}
    </button>
  );
};

export default PayHereButton;