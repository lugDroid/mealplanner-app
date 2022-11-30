import { useState } from "react";
import mealService from "../services/mealService";

const MealForm = ({ closeView, meals, setMeals, groups, times }) => {
  const [mealName, setMealName] = useState("");
  const [mealGroup, setMealGroup] = useState(groups[0]);
  const [mealTime, setMealTime] = useState(times[0]);
  const [numberOfDays, setNumberOfDays] = useState(0);

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
      setMealGroup(groups[0]);
      setMealTime(times[0]);
      setNumberOfDays(0);
    });

    closeView();
  };

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

  return (
    <form onSubmit={addMeal}>
      <h2>Add New Meal</h2>
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
          {groups.map((g) => (
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
          {times.map((t) => (
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
