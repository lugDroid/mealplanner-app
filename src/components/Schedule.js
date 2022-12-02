import { useEffect, useState } from "react";

const Schedule = ({ closeView, meals }) => {
  const [lunchs, setLunchs] = useState([]);
  const [dinners, setDinners] = useState([]);

  useEffect(() => {
    const getRandomMeal = (meals, timeOfDay) => {
      const index = Math.floor(Math.random() * meals.length);
      const randomMeal = meals[index];

      if (randomMeal.timeOfDay === timeOfDay) {
        return randomMeal;
      }

      return getRandomMeal(meals, timeOfDay);
    };

    const getGroupUses = (group, meals) => {
      return meals.filter((m) => m.group === group).length;
    };

    const generateWeeklyPlan = (meals, group) => {
      console.log(`Generating ${group} meals plan`);
      let weeklyMeals = [];

      for (let i = 0; i < 7; ) {
        const selectedMeal = getRandomMeal(meals, group);
        for (let j = 0; j < selectedMeal.numberOfDays; j++) {
          if (getGroupUses(selectedMeal.group, weeklyMeals) < 4 && i < 7) {
            i++;
            weeklyMeals.push(selectedMeal);
          } else {
            console.log(
              getGroupUses(selectedMeal.group, weeklyMeals),
              selectedMeal.group
            );
          }
        }
      }

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
