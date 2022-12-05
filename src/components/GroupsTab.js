import { useState, useEffect } from "react";

import groupService from "../services/groupService";
import GroupForm from "./GroupForm";

import GroupsList from "./GroupsList";

const GroupsTab = () => {
  const [groups, setGroups] = useState([]);
  const [activeView, setActiveView] = useState("list");

  useEffect(() => {
    groupService.getAllGroups().then((groups) => {
      setGroups(groups);
    });
  }, []);

  let content;
  switch (activeView) {
    case "list":
      content = <GroupsList groups={groups} />;
      break;
    case "new":
      content = (
        <GroupForm closeView={() => setActiveView("list")} group={null} />
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
