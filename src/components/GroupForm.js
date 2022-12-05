import { useState } from "react";

const GroupForm = ({ closeView, group }) => {
  return (
    <div>
      <h2>{group === null ? "Add new group" : `Modify ${group.name}`}</h2>
      <button onClick={closeView}>Cancel</button>
    </div>
  );
};

export default GroupForm;
