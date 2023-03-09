import MealsSummary from './MealsSummury';
import AvailableMeals from './AvailableMeals';
import { Fragment } from 'react';
const Meals = function () {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};
export default Meals;
