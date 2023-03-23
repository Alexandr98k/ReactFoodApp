import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import styles from './AvalilableMeals.module.css';

const AvailableMeals = function () {
  const [meals, setMeals] = useState([]);
  //відразу передаємо тру, тому що це завантаження відбувається тільки на початку запуску програми.
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  //В юз-ефекті функція не може бути асинхронною, тому потрібно передавати створити та викликати ще одну функцію, якщо вона повертає проміс. Тому що наша функція запиту до сервера повертає проміс.
  useEffect(() => {
    const fetchMeals = async function () {
      const response = await fetch(
        'https://react-http-post-f7e5a-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
      );

      if (!response.ok) {
        throw new Error('Something went wrong :(');
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
          key: key,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    //використовуємо кетч метод, тому що фетчМілз функція повертає проміз, який також потрібно зачекати.
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles['meals-loading']}>
        <Card>
          <p>Loading...</p>
        </Card>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles['meals-error']}>
        <Card>
          <p>{isError}</p>
        </Card>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
