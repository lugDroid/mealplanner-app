import { useState, useEffect } from "react";
import PlansList from "./PlansList";
import planService from "../services/planService";
// import Schedule from "./Schedule";

const WeeklyPlansTab = ({ meals, groups }) => {
  const [plans, setPlans] = useState([]);
  const [activeView, setActiveView] = useState("list");
  // showSchedule={() => setActiveView("schedule")}

  /* 
  } else if (activeView === "schedule") {
    console.log("Schedule view active");
    content = (
      <Schedule closeView={() => setActiveView("list")} meals={meals} />
    ); 
  */
  useEffect(() => {
    planService.getAllPlans().then((plans) => {
      setPlans(plans);
    });
  }, []);

  const getRandomMeal = (meals, timeOfDay) => {
    const index = Math.floor(Math.random() * meals.length);
    const randomMeal = meals[index];

    if (randomMeal.timeOfDay === timeOfDay) {
      return randomMeal;
    }

    return getRandomMeal(meals, timeOfDay);
  };

  const generateNewPlan = () => {
    console.log(`Generating new meals plan`);
    let weeklyMeals = [];

    const groupsUsed = groups.map((g) => {
      return { timesUsed: 0, ...g };
    });

    for (let i = 0; i < 7; ) {
      const selectedMeal = getRandomMeal(meals, "Lunch");
      const selectedGroup = groupsUsed.find(
        (g) => g.name === selectedMeal.group
      );

      if (weeklyMeals.includes(selectedMeal))
        console.log(`${selectedMeal.name} was already added`);

      if (
        selectedGroup.timesUsed + selectedMeal.numberOfDays <
        selectedGroup.weeklyRations
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

    weeklyMeals.forEach((m, i) => console.log(i, m.name));
    groupsUsed.forEach((g) =>
      console.log(g.name, g.weeklyRations, g.timesUsed)
    );
  };

  let content;
  switch (activeView) {
    case "list":
      content = <PlansList plans={plans} />;
      break;
    default:
      content = <PlansList plans={plans} />;
      break;
  }

  return (
    <div>
      <h2>Weekly Plans</h2>
      <button onClick={generateNewPlan}>Add New</button>
      {content}
    </div>
  );
};

export default WeeklyPlansTab;
