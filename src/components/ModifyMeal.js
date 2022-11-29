const ModifyMeal = ({ show, closeView, meal }) => {
  if (show) {
    return (
      <>
        <h4>Modify {meal.name}</h4>
        <button onClick={closeView}>Cancel</button>
      </>
    );
  }

  return null;
};

export default ModifyMeal;
