const PlansList = ({ plans }) => {
  if (plans.length === 0) {
    return (
      <div>
        <p>There is no plans, add one</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>You have {plans.length} plans</p>
      </div>
    );
  }
};

export default PlansList;
