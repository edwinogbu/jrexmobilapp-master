import React, { useState, useEffect, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Calculate subtotals for each item when cartItems changes
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      subtotal: item.price * item.quantity,
    }));
    setCartItems(updatedCartItems);
  }, [cartItems]);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, { ...item, subtotal: item.price }]);
  };

  const removeItemFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
      totalPrice += cartItem.subtotal;
    });
    return totalPrice;
  };

  const contextValues = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>
  );
};
