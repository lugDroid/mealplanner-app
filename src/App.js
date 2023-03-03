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
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
      tab = <MealsTab meals={meals} setMeals={setMeals} groups={groups} />;
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

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Loggin in with", userName, password);
  }

  return (
    <div>
      <h1>Meal Planner</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={userName}
            name="Username"
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <button onClick={() => setActiveTab("meals")}>Meals</button>
      <button onClick={() => setActiveTab("groups")}>Groups</button>
      <button onClick={() => setActiveTab("weeklyPlans")}>Weekly Plans</button>
      {tab}
    </div>
  );
};

export default App;
