import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

// overlay and backdrop can be created in separate files
const Backdrop = function ({ onHideCart }) {
  return <div className={styles.backdrop} onClick={onHideCart}></div>;
};

const ModalOverlay = function ({ children }) {
  return (
    <div className={styles.modal}>
      <div>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = function ({ children, onHideCart }) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onHideCart={onHideCart} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
