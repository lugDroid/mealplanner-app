import Meal from "./Meal";

const MealList = ({
  show,
  mealsToShow,
  deleteMeal,
  summaryView,
  showModify,
}) => {
  if (show) {
    return (
      <>
        <h2>List of Meals</h2>
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
  }

  return null;
};

export default MealList;
