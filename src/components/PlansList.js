const PlansList = ({ plans, deleteAction, modifyAction }) => {
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
        <ul>
          {plans.map((p, i) => (
            <li key={i}>
              <p>{p.name}</p>
              <button onClick={() => deleteAction(p.id)}>Delete</button>
              <button onClick={() => modifyAction(p.id)}>Details</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default PlansList;
