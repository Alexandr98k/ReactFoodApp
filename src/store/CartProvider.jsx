import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = function (state, action) {
  if (action.type === 'ADD_CART_ITEM') {
    //push - метод мутує оригінальний масив, а нам потрібно не мутувати оригінальний масив. Для цього використовуємо метод конкат.
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    //перед тим, як додавати новий айтем в список замовлених айтемів, ми перевіряємо чи є вже в списку такий же айтем
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE_CART_ITEM') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = function ({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = function (item) {
    dispatchCartAction({ type: 'ADD_CART_ITEM', item: item });
  };
  const removeItemFromCartHandler = function (id) {
    dispatchCartAction({ type: 'REMOVE_CART_ITEM', id: id });
  };
  const clearCartHandler = function () {
    dispatchCartAction({ type: 'CLEAR' });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
//ціль цього компонента - це керувати даними cart-context компонента  і надавати доступ до цього контексту всім компонентам, яким він необхідний. (обгортаючи ті компоненти CartProvider-ом)
