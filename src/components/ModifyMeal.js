const ModifyMeal = ({ closeView, meal }) => {
  return (
    <>
      <h4>Modify {meal.name}</h4>
      <button onClick={closeView}>Cancel</button>
    </>
  );
};

export default ModifyMeal;
