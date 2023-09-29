import React, { createContext, useReducer } from 'react';

// Define the initial state of the cart
const initialState = {
  items: [],
};

// Create a context for the cart
export const CartContext = createContext();

// Define the reducer function for the cart
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'EMPTY_CART':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

// Create a provider component for the cart
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  // Function to empty the cart
  const emptyItemsFromCart = () => {
    dispatch({ type: 'EMPTY_CART' });
  };

  // Function to get the sub-total of items in the cart
  const getSubTotalOfItems = () => {
    return state.items.reduce((total, item) => total + item.price, 0);
  };

  // Function to get the total of items in the cart
  const getTotalOfItems = () => {
    return getSubTotalOfItems() + (getSubTotalOfItems() * 0.1); // assuming 10% tax rate
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItemToCart,
        removeItemFromCart,
        emptyItemsFromCart,
        getSubTotalOfItems,
        getTotalOfItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
