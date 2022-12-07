import { useState } from "react";
import mealService from "../services/mealService";
import MealList from "./MealList";
import MealForm from "./MealForm";

const MealsTab = ({ meals, setMeals }) => {
  const [activeView, setActiveView] = useState("list");
  const [summaryView, setSummaryView] = useState(true);
  const [filter, setFilter] = useState("");
  const [mealToModify, setMealToModify] = useState({});

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
      />
    );
  }

  return (
    <div>
      <h2>Meals</h2>
      {content}
    </div>
  );
};

export default MealsTab;
