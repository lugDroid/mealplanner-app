const PlansList = ({ plans }) => {
  if (plans.length === 0) {
    return (
      <div>
        <p>There is no plans, add one</p>
      </div>
    );
  } else {
    console.log(plans);
    return (
      <div>
        <p>You have {plans.length} plans</p>
        <ul>
          {plans.map((p, i) => (
            <li key={i}>{p.name}</li>
          ))}
        </ul>
      </div>
    );
  }
};

export default PlansList;
