import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';

import styles from './Header.module.css';

import mealsImage from '../../assets/meals.jpg';

const Header = function ({ onShowCart }) {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShowCart={onShowCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
