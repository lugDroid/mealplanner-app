const Meal = ({ meal, deleteMeal, summaryView, showModify }) => {
  let details;

  if (summaryView) {
    details = null;
  } else {
    details = (
      <>
        <p>Group: {meal.group}</p>
        <p>Time of Day: {meal.timeOfDay}</p>
        <p>Number of Days: {meal.numberOfDays}</p>
        <div>
          <button onClick={() => showModify(meal.id)}>Modify</button>
          <button onClick={() => deleteMeal(meal.id)}>Delete</button>
        </div>
      </>
    );
  }
  return (
    <li>
      <h4>{meal.name}</h4>
      {details}
    </li>
  );
};

export default Meal;
