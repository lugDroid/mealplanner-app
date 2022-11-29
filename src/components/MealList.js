import { useState } from "react";
import Meal from "./Meal";
import Filter from "./Filter";

const MealList = ({ meals, deleteMeal, showMealForm }) => {
  const GROUP_FILTER = "Group:";
  const TIME_FILTER = "Time:";
  const DAYS_FILTER = "Days:";
  const [summaryView, setSummaryView] = useState(true);
  const [filter, setFilter] = useState("");

  const changeView = () => {
    setSummaryView(!summaryView);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const applyFilter = (filter) => {
    if (filter.startsWith(GROUP_FILTER)) {
      return meals.filter((m) => {
        const filterText = filter
          .substring(GROUP_FILTER.length)
          .toLocaleLowerCase()
          .trim();

        return m.group.toLocaleLowerCase().includes(filterText);
      });
    } else if (filter.startsWith(TIME_FILTER)) {
      return meals.filter((m) => {
        const filterText = filter
          .substring(TIME_FILTER.length)
          .toLocaleLowerCase()
          .trim();

        return m.timeOfDay.toLocaleLowerCase().includes(filterText);
      });
    } else if (filter.startsWith(DAYS_FILTER)) {
      return meals.filter((m) => {
        const filterText = filter.substring(DAYS_FILTER.length).trim();

        return String(m.numberOfDays) === filterText;
      });
    }

    return meals.filter((m) =>
      m.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const mealsToShow = filter === "" ? meals : applyFilter(filter);

  return (
    <>
      <h2>List of Meals</h2>
      <Filter value={filter} handleChange={handleFilterChange} />
      <button onClick={changeView}>
        {summaryView ? "Details View" : "Summary View"}
      </button>
      <button onClick={() => showMealForm(0)}>Add New</button>
      <ul>
        {mealsToShow.map((m) => (
          <Meal
            meal={m}
            key={m.id}
            deleteMeal={deleteMeal}
            summaryView={summaryView}
            modifyMeal={showMealForm}
          />
        ))}
      </ul>
    </>
  );
};

export default MealList;
