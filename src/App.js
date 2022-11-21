import axios from "axios";
import { useState, useEffect } from "react";
import Meal from "./components/Meal";

const App = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/meals").then((res) => {
      console.log(res.data);
      setMeals(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Meal Planner</h1>
      <ul>
        {meals.map((m) => (
          <Meal meal={m} />
        ))}
      </ul>
    </div>
  );
};

export default App;
