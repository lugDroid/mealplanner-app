import { useState, useEffect } from "react";
import PlansList from "./PlansList";
import planService from "../services/planService";
import WeeklyPlan from "./WeeklyPlan";

const WeeklyPlansTab = ({ meals, groups }) => {
  const [plans, setPlans] = useState([]);
  const [activeView, setActiveView] = useState("list");
  const [lunchPlan, setLunchPlan] = useState([]);
  const [dinnerPlan, setDinnerPlan] = useState([]);

  useEffect(() => {
    planService.getAllPlans().then((plans) => {
      setPlans(plans);
    });
  }, []);

  const getRandomMeal = (meals, times) => {
    const index = Math.floor(Math.random() * meals.length);
    const randomMeal = meals[index];

    if (times.includes(randomMeal.timeOfDay)) {
      return randomMeal;
    }

    return getRandomMeal(meals, times);
  };

  const generateNewPlan = (times) => {
    console.log(`Generating new meals plan for ${times[0]}`);
    let weeklyMeals = [];

    const groupsUsed = groups.map((g) => {
      return { timesUsed: 0, ...g };
    });

    for (let i = 0; i < 7; ) {
      const selectedMeal = getRandomMeal(meals, times);
      const selectedGroup = groupsUsed.find(
        (g) => g.name === selectedMeal.group
      );

      if (weeklyMeals.includes(selectedMeal))
        console.log(`${selectedMeal.name} was already added`);

      if (
        selectedGroup.timesUsed + selectedMeal.numberOfDays <
          selectedGroup.weeklyRations &&
        !weeklyMeals.includes(selectedMeal)
      ) {
        selectedGroup.timesUsed += selectedMeal.numberOfDays;

        for (let j = 0; j < selectedMeal.numberOfDays; j++) {
          if (i < 7) {
            i++;
            weeklyMeals.push(selectedMeal);
          }
        }
      }
    }

    //weeklyMeals.forEach((m, i) => console.log(i, m.name));
    groupsUsed.forEach((g) =>
      console.log(g.name, g.weeklyRations, g.timesUsed)
    );

    return weeklyMeals;
  };

  const activateNewPlanView = (event) => {
    event.preventDefault();

    setLunchPlan(generateNewPlan(["Lunch", "Any"]));
    setDinnerPlan(generateNewPlan(["Dinner", "Any"]));

    setActiveView("new");
  };

  const saveNewPlan = (plan) => {
    console.log("Saving plan...");
    planService.createPlan(plan).then((returnedPlan) => {
      setPlans(plans.concat(returnedPlan));
    });

    setActiveView("list");
  };

  let content;
  switch (activeView) {
    case "list":
      content = <PlansList plans={plans} />;
      break;
    case "new":
      content = (
        <WeeklyPlan
          closeView={() => setActiveView("list")}
          savePlan={saveNewPlan}
          lunchPlan={lunchPlan}
          dinnerPlan={dinnerPlan}
        />
      );
      break;
    default:
      content = <PlansList plans={plans} />;
      break;
  }

  return (
    <div>
      <h2>Weekly Plans</h2>
      <button onClick={activateNewPlanView}>Add New</button>
      {content}
    </div>
  );
};

export default WeeklyPlansTab;
