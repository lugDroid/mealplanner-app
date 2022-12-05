import { useState } from "react";

const GroupForm = ({ closeView, group }) => {
  return (
    <div>
      <h3>{group === null ? "Add new group" : `Modify ${group.name}`}</h3>
      <button onClick={closeView}>Cancel</button>
    </div>
  );
};

export default GroupForm;
