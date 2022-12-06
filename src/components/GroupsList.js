const Group = ({ group, deleteAction }) => {
  return (
    <li>
      <p>{group.name}</p>
      <p>Weely Rations: {group.weeklyRations}</p>
      <button onClick={() => deleteAction(group.id)}>Delete</button>
    </li>
  );
};

const GroupsList = ({ groups, deleteAction }) => {
  return (
    <ul>
      {groups.map((g) => (
        <Group group={g} key={g.id} deleteAction={deleteAction} />
      ))}
    </ul>
  );
};

export default GroupsList;
