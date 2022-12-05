import { useState } from "react";

import WeeklyPlansTab from "./components/WeeklyPlansTab";
import GroupsTab from "./components/GroupsTab";
import MealsTab from "./components/MealsTab";

const App = () => {
  const [activeTab, setActiveTab] = useState("meals");

  let tab;

  switch (activeTab) {
    case "meals":
      tab = <MealsTab />;
      break;
    case "groups":
      tab = <GroupsTab />;
      break;
    case "weeklyPlans":
      tab = <WeeklyPlansTab />;
      break;
    default:
      tab = <MealsTab />;
  }

  return (
    <div>
      <h1>Meal Planner</h1>
      <button onClick={() => setActiveTab("meals")}>Meals</button>
      <button onClick={() => setActiveTab("groups")}>Groups</button>
      <button onClick={() => setActiveTab("weeklyPlans")}>Weekly Plans</button>
      {tab}
    </div>
  );
};

export default App;
