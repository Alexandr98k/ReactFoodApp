import React from 'react';
//initialization context with default data, which we are not going to use later, but for better autocomplition
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem(item) {},
  removeItem(id) {},
  clearCart() {},
});

export default CartContext;
