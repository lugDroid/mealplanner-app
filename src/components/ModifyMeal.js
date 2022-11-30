import { useState } from "react";

const ModifyMeal = ({ closeView, meal, groups, times }) => {
  const [mealName, setMealName] = useState(meal.name);
  const [mealGroup, setMealGroup] = useState(meal.group);
  const [mealTime, setMealTime] = useState(meal.timeOfDay);
  const [numberOfDays, setNumberOfDays] = useState(meal.numberOfDays);

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
    <>
      <h2>Modify {meal.name}</h2>
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
      <button onClick={closeView}>Cancel</button>
    </>
  );
};

export default ModifyMeal;
