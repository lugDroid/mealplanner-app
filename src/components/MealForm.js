import { useState } from "react";
import mealService from "../services/mealService";

const MealForm = ({ closeView, meal, meals, setMeals }) => {
  const GROUPS = ["A", "B", "C"];
  const TIMES = ["Lunch", "Dinner", "Any"];

  const [mealName, setMealName] = useState(meal === null ? "" : meal.name);
  const [mealGroup, setMealGroup] = useState(
    meal === null ? GROUPS[0] : meal.group
  );
  const [mealTime, setMealTime] = useState(
    meal === null ? TIMES[0] : meal.timeOfDay
  );
  const [numberOfDays, setNumberOfDays] = useState(
    meal === null ? 0 : meal.numberOfDays
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.getAttribute("name");

    switch (name) {
      case "meal-name":
        setMealName(value);
        break;
      case "group-select":
        setMealGroup(value);
        break;
      case "time-select":
        setMealTime(value);
        break;
      case "number-of-days":
        setNumberOfDays(value);
        break;
      default:
        break;
    }
  };

  const addMeal = (event) => {
    event.preventDefault();
    const mealObj = {
      name: mealName,
      group: mealGroup,
      timeOfDay: mealTime,
      numberOfDays: numberOfDays,
      id: Math.max(meals.map((m) => m.id)) + 1,
    };

    mealService.createMeal(mealObj).then((returnedMeal) => {
      setMeals(meals.concat(returnedMeal));
      setMealName("");
      setMealGroup(GROUPS[0]);
      setMealTime(TIMES[0]);
      setNumberOfDays(0);
    });

    closeView();
  };

  const modifyMeal = (event) => {
    event.preventDefault();

    const mealObject = {
      name: mealName,
      group: mealGroup,
      timeOfDay: mealTime,
      numberOfDays: numberOfDays,
      id: meal.id,
    };

    mealService.modifyMeal(meal.id, mealObject).then((returnedMeal) => {
      setMeals(meals.map((m) => (m.id !== meal.id ? m : returnedMeal)));
    });

    setMealName("");
    setMealGroup(GROUPS[0]);
    setMealTime(TIMES[0]);
    setNumberOfDays(0);

    closeView();
  };

  return (
    <form onSubmit={meal === null ? addMeal : modifyMeal}>
      <h2>{meal === null ? "Add new meal" : `Modify ${meal.name}`}</h2>
      <div>
        <label htmlFor="mealName">Name</label>
        <input value={mealName} onChange={handleInputChange} name="meal-name" />
      </div>
      <div>
        <label htmlFor="group-select">Group</label>
        <select
          name="group-select"
          value={mealGroup}
          onChange={handleInputChange}
        >
          {GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="time-select">Time of Day</label>
        <select
          name="time-select"
          value={mealTime}
          onChange={handleInputChange}
        >
          {TIMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="number-of-days">Number Of Days</label>
        <input
          value={numberOfDays}
          onChange={handleInputChange}
          name="number-of-days"
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={closeView}>
        Cancel
      </button>
    </form>
  );
};

export default MealForm;
