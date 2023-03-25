import { useState, useEffect } from "react";
import mealService from "./services/mealService";
import groupService from "./services/groupService";
import loginService from "./services/loginService";
import WeeklyPlansTab from "./components/WeeklyPlansTab";
import GroupsTab from "./components/GroupsTab";
import MealsTab from "./components/MealsTab";
import LoginForm from "./components/LoginForm";
import planService from "./services/planService";
import Togglable from "./components/Togglable";

const App = () => {
  const [activeTab, setActiveTab] = useState("meals");
  const [meals, setMeals] = useState([]);
  const [groups, setGroups] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user !== null) {
      const getMeals = async () => {
        const initialMeals = await mealService.getAllMeals();
        setMeals(initialMeals);
      };

      const getGroups = async () => {
        const initialGroups = await groupService.getAllGroups();
        setGroups(initialGroups);
      }

      getMeals();
      getGroups();
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("mealPlannerAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);

      mealService.setToken(user.token);
      groupService.setToken(user.token);
      planService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("mealPlannerAppUser", JSON.stringify(user));

      mealService.setToken(user.token);
      groupService.setToken(user.token);
      planService.setToken(user.token);

      setUser(user)
      setUsername("");
      setPassword("");
    } catch (ex) {
      console.log(ex.message)
      console.log("Wrong credentials");
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault();

    window.localStorage.removeItem("mealPlannerAppUser");

    mealService.removeToken();
    groupService.removeToken();
    planService.removeToken();

    setUser(null);
  }

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

  const showTabs = () => {
    return (
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>Log Out</button></p>
        <button onClick={() => setActiveTab("meals")}>Meals</button>
        <button onClick={() => setActiveTab("groups")}>Groups</button>
        <button onClick={() => setActiveTab("weeklyPlans")}>Weekly Plans</button>
        {tab}
      </div>)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login">
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>Meal Planner</h1>
      {user === null ? loginForm() : showTabs()}
    </div>
  );
};

export default App;
