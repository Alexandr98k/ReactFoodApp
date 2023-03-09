import styles from './MealItem.module.css';

const MealItem = function ({ name, description, price }) {
  const formattedPrice = `$${price.toFixed(2)}`;
  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>{formattedPrice}</p>
      </div>
      <div></div>
    </li>
  );
};
export default MealItem;
