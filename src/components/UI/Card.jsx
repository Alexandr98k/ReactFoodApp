import styles from './Card.module.css';

const Card = function ({ children }) {
  return <div className={styles.card}>{children}</div>;
};
export default Card;
