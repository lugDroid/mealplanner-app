import { useState } from "react";
import mealService from "../services/mealService";

const MealForm = ({ closeView, meals, setMeals }) => {
  const GROUPS = ["A", "B", "C"];
  const TIMES = ["Lunch", "Dinner", "Any"];

  const [mealName, setMealName] = useState("");
  const [mealGroup, setMealGroup] = useState(GROUPS[0]);
  const [mealTime, setMealTime] = useState(TIMES[0]);
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
      setMealGroup(GROUPS[0]);
      setMealTime(TIMES[0]);
      setNumberOfDays(0);
    });

    closeView();
  };

  const handleMealNameChange = (event) => {
    setMealName(event.target.value);
  };

  const handleNumberOfDaysChange = (event) => {
    setNumberOfDays(event.target.value);
  };

  const handleMealGroupChange = (event) => {
    setMealGroup(event.target.value);
  };

  const handleMealTimeChange = (event) => {
    setMealTime(event.target.value);
  };

  return (
    <form onSubmit={addMeal}>
      <h2>Add New Meal</h2>
      <div>
        <label htmlFor="mealName">Name</label>
        <input value={mealName} onChange={handleMealNameChange} id="mealName" />
      </div>
      <div>
        <label htmlFor="group-select">Group</label>
        <select
          id="group-select"
          value={mealGroup}
          onChange={handleMealGroupChange}
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
          id="time-select"
          value={mealTime}
          onChange={handleMealTimeChange}
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
          onChange={handleNumberOfDaysChange}
          id="number-of-days"
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
