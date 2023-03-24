import { Fragment, useContext, useEffect, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = function ({ onHideCart }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  //disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'scroll');
  });

  const cartItemRemoveHandler = function (id) {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = function (item) {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = function () {
    setIsCheckout(true);
  };

  const submitOrderHandler = async function (userData) {
    setIsSubmitting(true);
    await fetch(
      'https://react-http-post-f7e5a-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      },
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={onHideCart}>
        Close
      </button>

      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onSubmit={submitOrderHandler} onCancel={onHideCart} />}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data ...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={onHideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onHideCart={onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
