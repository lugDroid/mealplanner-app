import { useState, useEffect } from "react";
import Meal from "./components/Meal";
import Filter from "./components/Filter";
import MealForm from "./components/MealForm";
import mealService from "./services/mealService";

const App = () => {
  const GROUP_FILTER = "Group:";
  const TIME_FILTER = "Time:";
  const DAYS_FILTER = "Days:";

  const [meals, setMeals] = useState([]);
  const [filter, setFilter] = useState("");
  const [summaryView, setSummaryView] = useState(true);

  useEffect(() => {
    mealService.getAllMeals().then((initialMeals) => {
      setMeals(initialMeals);
    });
  }, []);

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

  const deleteMeal = (id) => {
    const meal = meals.find((m) => m.id === id);

    if (window.confirm(`Delete ${meal.name}?`)) {
      mealService.deleteMeal(id).then(() => {
        mealService.getAllMeals().then((meals) => setMeals(meals));
      });
    }
  };

  const changeView = () => {
    setSummaryView(!summaryView);
  };

  const mealsToShow = filter === "" ? meals : applyFilter(filter);

  return (
    <div>
      <h1>Meal Planner</h1>
      <h2>Options</h2>
      <Filter value={filter} handleChange={handleFilterChange} />
      <button onClick={changeView}>
        {summaryView ? "Details View" : "Summary View"}
      </button>
      <h2>Add New Meal</h2>
      <MealForm meals={meals} setMeals={setMeals} />
      <h2>List of Meals</h2>
      <ul>
        {mealsToShow.map((m) => (
          <Meal
            meal={m}
            key={m.id}
            deleteMeal={deleteMeal}
            summaryView={summaryView}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
