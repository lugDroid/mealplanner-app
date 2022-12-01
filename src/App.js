import { useState, useEffect } from "react";
import MealList from "./components/MealList";
import ModifyMeal from "./components/ModifyMeal";
import MealForm from "./components/MealForm";
import mealService from "./services/mealService";

const App = () => {
  const GROUPS = ["A", "B", "C"];
  const TIMES = ["Lunch", "Dinner", "Any"];

  const [activeView, setActiveView] = useState("list");
  const [mealToModify, setMealToModify] = useState({});
  const [meals, setMeals] = useState([]);
  const [summaryView, setSummaryView] = useState(true);

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
      <ModifyMeal
        closeView={() => setActiveView("list")}
        meal={mealToModify}
        groups={GROUPS}
        times={TIMES}
      />
    );
  } else if (activeView === "new") {
    content = (
      <MealForm
        closeView={() => setActiveView("list")}
        meals={meals}
        setMeals={setMeals}
        groups={GROUPS}
        times={TIMES}
      />
    );
  } else {
    content = (
      <MealList
        meals={meals}
        deleteMeal={deleteMeal}
        showMealForm={showMealForm}
        changeView={changeView}
        summaryView={summaryView}
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
