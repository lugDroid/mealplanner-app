const WeeklyPlan = ({ closeView, savePlan, lunchPlan, dinnerPlan }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div>
      <h2>New Schedule</h2>
      <h3>Lunch Meals</h3>
      <ul>
        {lunchPlan.map((m, i) => (
          <li key={i}>
            {days[i]} - {m.name}
          </li>
        ))}
      </ul>
      <h3>Dinner Meals</h3>
      <ul>
        {dinnerPlan.map((m, i) => (
          <li key={i}>
            {days[i]} - {m.name}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => savePlan({ lunch: lunchPlan, dinner: dinnerPlan })}
      >
        Save
      </button>
      <button type="button" onClick={closeView}>
        Cancel
      </button>
    </div>
  );
};

export default WeeklyPlan;
