import { useState } from "react";

const WeeklyPlan = ({ closeView, plan, savePlan, lunchPlan, dinnerPlan }) => {
  const [planName, setPlanName] = useState(plan === null ? "" : plan.name);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.getAttribute("name");

    switch (name) {
      case "plan-name":
        setPlanName(value);
        break;
      default:
        break;
    }
  };

  const addPlan = (event) => {
    event.preventDefault();
    savePlan({
      name: planName,
      lunch: lunchPlan,
      dinner: dinnerPlan,
      id: plan === null ? 0 : plan.id,
    });

    closeView();
  };

  return (
    <form onSubmit={addPlan}>
      <h2>New Schedule</h2>
      <input value={planName} onChange={handleInputChange} name="plan-name" />
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
      <button type="submit">Save</button>
      <button type="button" onClick={closeView}>
        Cancel
      </button>
    </form>
  );
};

export default WeeklyPlan;
