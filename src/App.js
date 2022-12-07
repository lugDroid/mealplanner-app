import { useState, useEffect } from "react";
import mealService from "./services/mealService";
import groupService from "./services/groupService";
import WeeklyPlansTab from "./components/WeeklyPlansTab";
import GroupsTab from "./components/GroupsTab";
import MealsTab from "./components/MealsTab";

const App = () => {
  const [activeTab, setActiveTab] = useState("meals");
  const [meals, setMeals] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    mealService.getAllMeals().then((initialMeals) => {
      setMeals(initialMeals);
    });

    groupService.getAllGroups().then((groups) => {
      setGroups(groups);
    });
  }, []);

  let tab;

  switch (activeTab) {
    case "meals":
      tab = <MealsTab meals={meals} setMeals={setMeals} />;
      break;
    case "groups":
      tab = <GroupsTab groups={groups} setGroups={setGroups} />;
      break;
    case "weeklyPlans":
      tab = <WeeklyPlansTab meals={meals} groups={groups} />;
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
