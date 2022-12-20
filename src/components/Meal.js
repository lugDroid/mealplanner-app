const Meal = ({ meal, deleteMeal, summaryView, modifyMeal }) => {
  let details;

  if (summaryView) {
    details = null;
  } else {
    details = (
      <>
        <p>Group: {meal.group.name}</p>
        <p>Time of Day: {meal.timeOfDay}</p>
        <p>Number of Days: {meal.numberOfDays}</p>
        <div>
          <button onClick={() => modifyMeal(meal.id)}>Modify</button>
          <button onClick={() => deleteMeal(meal.id)}>Delete</button>
        </div>
      </>
    );
  }
  return (
    <li>
      <p>{meal.name}</p>
      {details}
    </li>
  );
};

export default Meal;
