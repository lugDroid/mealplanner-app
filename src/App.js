import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  useEffect(() => {
    axios.get("http://localhost:3001/meals").then((res) => {
      console.log(res.data);
    });
  });
  return (
    <div>
      <h1>Meal Planner</h1>
    </div>
  );
};

export default App;
