import { useState } from "react";
import mealService from "../services/mealService";
import MealList from "./MealList";
import ModifyMeal from "./ModifyMeal";
import MealForm from "./MealForm";

const Content = ({ meals, setMeals }) => {
  const [activeView, setActiveView] = useState("list");
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

  if (activeView === "modify") {
    return (
      <ModifyMeal closeView={() => setActiveView("list")} meal={mealToModify} />
    );
  } else if (activeView === "new") {
    return (
      <MealForm
        closeView={() => setActiveView("list")}
        meals={meals}
        setMeals={setMeals}
      />
    );
  } else {
    return (
      <MealList
        meals={meals}
        deleteMeal={deleteMeal}
        showMealForm={showMealForm}
      />
    );
  }
};

export default Content;
