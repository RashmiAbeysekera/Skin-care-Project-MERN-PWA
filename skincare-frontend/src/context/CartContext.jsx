import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage if available
    try {
      const localCart = localStorage.getItem('cartItems');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    // Persist cart to localStorage whenever it changes
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const addItem = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check both MongoDB _id and numeric id to find existing items
      const existingItemIndex = prevItems.findIndex((item) => 
        (item._id && item._id === product._id) || (item.id && item.id === product.id)
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
    setIsCartOpen(true); // Automatically open the sidebar when an item is added
  };

  const removeItem = (productId) => {
    // Filter out if either id or _id matches the productId passed from the component
    setCartItems((prevItems) => prevItems.filter((item) => 
      item.id !== productId && item._id !== productId
    ));
  };

  const updateItemQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== productId && item._id !== productId);
      }
      return prevItems.map((item) => 
        (item.id === productId || item._id === productId) ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const cartTotal = calculateTotal();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    cartTotal,
    cartCount,
    addItem,
    removeItem,
    updateItemQuantity,
    isCartOpen,
    setIsCartOpen
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};