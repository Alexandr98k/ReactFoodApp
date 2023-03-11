import { useContext } from 'react';

import styles from './MealItem.module.css';

import CartContext from '../../../store/cart-context';
import MealItemForm from './MealItemForm';

const MealItem = function ({ name, description, price, id }) {
  const cartCtx = useContext(CartContext);
  const formattedPrice = `$${price.toFixed(2)}`;
  const addToCartHandler = function (amount) {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>{formattedPrice}</p>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
