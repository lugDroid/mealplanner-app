const Meal = ({ meal, loadMealData, deleteMeal }) => {
  return (
    <li>
      <h4>{meal.name}</h4>
      <p>Group: {meal.group}</p>
      <p>Time of Day: {meal.timeOfDay}</p>
      <p>Number of Days: {meal.numberOfDays}</p>
      <div>
        <button onClick={() => deleteMeal(meal.id)}>Delete</button>
      </div>
    </li>
  );
};

export default Meal;
