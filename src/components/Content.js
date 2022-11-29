import { useState } from "react";
import mealService from "../services/mealService";
import MealList from "./MealList";
import ModifyMeal from "./ModifyMeal";

const Content = ({ meals, setMeals, summaryView, mealsToShow }) => {
  const [modifyView, setModifyView] = useState(false);
  const [mealToModify, setMealToModify] = useState({});

  const toggleModifyView = (id = 0) => {
    setModifyView(!modifyView);

    if (id) {
      const meal = meals.find((m) => m.id === id);
      setMealToModify(meal);
    } else {
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

  if (modifyView) {
    return <ModifyMeal closeView={toggleModifyView} meal={mealToModify} />;
  } else {
    return (
      <MealList
        mealsToShow={mealsToShow}
        deleteMeal={deleteMeal}
        summaryView={summaryView}
        showModify={toggleModifyView}
      />
    );
  }
};

export default Content;
