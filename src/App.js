import { useState, useEffect } from "react";
import MealList from "./components/MealList";
import MealForm from "./components/MealForm";
import mealService from "./services/mealService";
import Schedule from "./components/Schedule";

const App = () => {
  const [activeView, setActiveView] = useState("list");
  const [mealToModify, setMealToModify] = useState({});
  const [meals, setMeals] = useState([]);
  const [summaryView, setSummaryView] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    mealService.getAllMeals().then((initialMeals) => {
      setMeals(initialMeals);
    });
  }, []);

  const showMealForm = (id) => {
    if (id) {
      setActiveView("modify");
      const meal = meals.find((m) => m.id === id);
      setMealToModify(meal);
    } else {
      setActiveView("new");
      setMealToModify({});
    }
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

  let content;

  if (activeView === "modify") {
    content = (
      <MealForm
        closeView={() => setActiveView("list")}
        meal={mealToModify}
        meals={meals}
        setMeals={setMeals}
      />
    );
  } else if (activeView === "new") {
    content = (
      <MealForm
        closeView={() => setActiveView("list")}
        meal={null}
        meals={meals}
        setMeals={setMeals}
      />
    );
  } else if (activeView === "schedule") {
    console.log("Schedule view active");
    content = (
      <Schedule closeView={() => setActiveView("list")} meals={meals} />
    );
  } else {
    content = (
      <MealList
        meals={meals}
        deleteMeal={deleteMeal}
        showMealForm={showMealForm}
        changeView={changeView}
        summaryView={summaryView}
        filter={filter}
        setFilter={setFilter}
        showSchedule={() => setActiveView("schedule")}
      />
    );
  }
  return (
    <div>
      <h1>Meal Planner</h1>
      {content}
    </div>
  );
};

export default App;
