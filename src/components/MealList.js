import { useState } from "react";
import Meal from "./Meal";

const MealList = ({ mealsToShow, deleteMeal, showModify }) => {
  const [summaryView, setSummaryView] = useState(true);

  const changeView = () => {
    setSummaryView(!summaryView);
  };

  return (
    <>
      <h2>List of Meals</h2>
      <button onClick={changeView}>
        {summaryView ? "Details View" : "Summary View"}
      </button>
      <ul>
        {mealsToShow.map((m) => (
          <Meal
            meal={m}
            key={m.id}
            deleteMeal={deleteMeal}
            summaryView={summaryView}
            showModify={showModify}
          />
        ))}
      </ul>
    </>
  );
};

export default MealList;
