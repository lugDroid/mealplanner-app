import { useState, useEffect } from "react";
import PlansList from "./PlansList";
import planService from "../services/planService";
import WeeklyPlan from "./WeeklyPlan";

const WeeklyPlansTab = ({ meals, groups }) => {
  const [plans, setPlans] = useState([]);
  const [activeView, setActiveView] = useState("list");
  const [lunchPlan, setLunchPlan] = useState([]);
  const [dinnerPlan, setDinnerPlan] = useState([]);
  const [plantoModify, setPlanToModify] = useState({});

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
        (g) => g.name === selectedMeal.group.name
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
    plan.id = Math.max(plans.map((p) => p.id)) + 1;
    planService.createPlan(plan).then((returnedPlan) => {
      setPlans(plans.concat(returnedPlan));
    });
  };

  const saveModifiedPlan = (plan) => {
    console.log("Saving modified plan...");

    planService.modifyPlan(plan.id, plan).then((returnedPlan) => {
      setPlans(plans.map((p) => (p.id === plan.id ? returnedPlan : p)));
    });
  };

  const deletePlan = (id) => {
    const plan = plans.find((p) => p.id === id);

    if (window.confirm(`Delete ${plan.name}?`)) {
      planService.deletePlan(id).then(() => {
        planService.getAllPlans().then((plans) => setPlans(plans));
      });
    }
  };

  const modifyPlan = (id) => {
    const plan = plans.find((p) => p.id === id);

    setActiveView("modify");
    setPlanToModify(plan);
    setLunchPlan(plan.lunch);
    setDinnerPlan(plan.dinner);
  };

  let content;
  switch (activeView) {
    case "list":
      content = (
        <PlansList
          plans={plans}
          deleteAction={deletePlan}
          modifyAction={modifyPlan}
        />
      );
      break;
    case "new":
      content = (
        <WeeklyPlan
          closeView={() => setActiveView("list")}
          plan={null}
          savePlan={saveNewPlan}
          lunchPlan={lunchPlan}
          dinnerPlan={dinnerPlan}
        />
      );
      break;
    case "modify":
      content = (
        <WeeklyPlan
          closeView={() => setActiveView("list")}
          plan={plantoModify}
          savePlan={saveModifiedPlan}
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
