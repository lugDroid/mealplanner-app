import { useState, useEffect } from "react";
import MealForm from "./components/MealForm";
import Content from "./components/Content";
import mealService from "./services/mealService";

const App = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    mealService.getAllMeals().then((initialMeals) => {
      setMeals(initialMeals);
    });
  }, []);

  return (
    <div>
      <h1>Meal Planner</h1>
      <Content meals={meals} setMeals={setMeals} />
    </div>
  );
};

export default App;
