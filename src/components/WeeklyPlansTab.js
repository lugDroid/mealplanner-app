// import Schedule from "./Schedule";

const WeeklyPlansTab = () => {
  // showSchedule={() => setActiveView("schedule")}

  /* 
  } else if (activeView === "schedule") {
    console.log("Schedule view active");
    content = (
      <Schedule closeView={() => setActiveView("list")} meals={meals} />
    ); 
  */

  return (
    <div>
      <h2>Weekly Plans</h2>
      <button onClick={() => console.log("Add new weekly plan")}>
        Add New
      </button>
    </div>
  );
};

export default WeeklyPlansTab;
