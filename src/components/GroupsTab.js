import { useState, useEffect } from "react";

import groupService from "../services/groupService";

import GroupsList from "./GroupsList";

const GroupsTab = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    groupService.getAllGroups().then((groups) => {
      setGroups(groups);
    });
  }, []);

  return (
    <div>
      <h4>Groups</h4>
      <GroupsList groups={groups} />
    </div>
  );
};

export default GroupsTab;
