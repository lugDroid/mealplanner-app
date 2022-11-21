const Meal = ({ meal }) => {
  return (
    <li key={meal.id}>
      <h4>{meal.name}</h4>
      <p>Group: {meal.group}</p>
      <p>Time of Day: {meal.timeOfDay}</p>
      <p>Number of Days: {meal.numberOfDays}</p>
    </li>
  );
};

export default Meal;
