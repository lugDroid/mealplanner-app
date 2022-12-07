import { useState } from "react";
import groupService from "../services/groupService";
import GroupForm from "./GroupForm";
import GroupsList from "./GroupsList";

const GroupsTab = ({ groups, setGroups }) => {
  const [activeView, setActiveView] = useState("list");
  const [groupToModify, setGroupToModify] = useState({});

  const saveNewGroup = (newGroup) => {
    setGroups(groups.concat(newGroup));
  };

  const saveModifiedGroup = (modifiedGroup) => {
    setGroups(
      groups.map((g) => (g.id === modifiedGroup.id ? modifiedGroup : g))
    );
  };

  const deleteGroup = (id) => {
    const group = groups.find((g) => g.id === id);

    if (window.confirm(`Delete ${group.name}?`)) {
      groupService.deleteGroup(id).then(() => {
        groupService.getAllGroups().then((groups) => setGroups(groups));
      });
    }
  };

  const showModifyForm = (group) => {
    setGroupToModify(group);
    setActiveView("modify");
  };

  let content;
  switch (activeView) {
    case "list":
      content = (
        <GroupsList
          groups={groups}
          deleteAction={deleteGroup}
          showModifyForm={showModifyForm}
          saveModifiedGroup={saveModifiedGroup}
        />
      );
      break;
    case "new":
      content = (
        <GroupForm
          closeView={() => setActiveView("list")}
          group={null}
          newId={() => Math.max(groups.map((g) => g.id)) + 1}
          saveNew={saveNewGroup}
          saveModifiedGroup={saveModifiedGroup}
        />
      );
      break;
    case "modify":
      content = (
        <GroupForm
          closeView={() => setActiveView("list")}
          group={groupToModify}
          newId={() => Math.max(groups.map((g) => g.id)) + 1}
          saveNew={saveNewGroup}
          saveModifiedGroup={saveModifiedGroup}
        />
      );
      break;
    default:
      content = <GroupsList groups={groups} />;
  }

  return (
    <div>
      <h2>Groups</h2>
      <button onClick={() => setActiveView("new")}>Add new</button>
      {content}
    </div>
  );
};

export default GroupsTab;
