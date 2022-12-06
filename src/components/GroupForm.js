import { useState } from "react";

import groupService from "../services/groupService";

const GroupForm = ({ closeView, group, newId, saveNew, saveModifiedGroup }) => {
  const [groupName, setGroupName] = useState(group === null ? "" : group.name);
  const [weeklyRations, setWeeklyRations] = useState(
    group === null ? 0 : group.weeklyRations
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.getAttribute("name");

    switch (name) {
      case "group-name":
        setGroupName(value);
        break;
      case "weekly-rations":
        setWeeklyRations(value);
        break;
      default:
        break;
    }
  };

  const addGroup = (event) => {
    event.preventDefault();

    const groupObj = {
      name: groupName,
      weeklyRations: weeklyRations,
      id: newId(),
    };

    groupService.createGroup(groupObj).then((returnedGroup) => {
      saveNew(returnedGroup);
      setGroupName("");
      setWeeklyRations(0);
    });

    closeView();
  };

  const modifyGroup = (event) => {
    event.preventDefault();

    const groupObj = {
      name: groupName,
      weeklyRations: weeklyRations,
      id: newId(),
    };

    saveModifiedGroup(groupObj);

    groupService.modifyGroup(group.id, groupObj).then((returnedGroup) => {
      saveModifiedGroup(returnedGroup);
      setGroupName("");
      setWeeklyRations(0);
    });

    closeView();
  };

  return (
    <form onSubmit={group === null ? addGroup : modifyGroup}>
      <h3>{group === null ? "Add new group" : `Modify ${group.name}`}</h3>
      <div>
        <label htmlFor="groupName">Name</label>
        <input
          value={groupName}
          onChange={handleInputChange}
          name="group-name"
        />
      </div>
      <div>
        <label htmlFor="weekly-rations">Weekly Rations</label>
        <input
          value={weeklyRations}
          onChange={handleInputChange}
          name="weekly-rations"
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={closeView}>
        Cancel
      </button>
    </form>
  );
};

export default GroupForm;
