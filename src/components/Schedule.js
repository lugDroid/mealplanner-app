import { useEffect, useState } from "react";

const Schedule = ({ closeView, meals }) => {
  const [lunchs, setLunchs] = useState([]);
  const [dinners, setDinners] = useState([]);

  useEffect(() => {
    const generateWeeklyPlan = (meals, group) => {
      weeklyMeals.map((m, i) => console.log(i, m.name));
    };

    setLunchs(generateWeeklyPlan(meals, "Lunch"));
    setDinners(generateWeeklyPlan(meals, "Dinner"));
  }, [meals]);

  return (
    <div>
      <h2>New Schedule</h2>
      <h3>Lunch Meals</h3>
      <ul>
        {lunchs.map((m) => (
          <li>{m.name}</li>
        ))}
      </ul>
      <h3>Dinner Meals</h3>
      <button type="button" onClick={closeView}>
        Cancel
      </button>
    </div>
  );
};

export default Schedule;
