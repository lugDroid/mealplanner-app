const Group = ({ group }) => {
  return (
    <li>
      <p>{group.name}</p>
      <p>Weely Rations: {group.weeklyRations}</p>
    </li>
  );
};

const GroupsList = ({ groups }) => {
  return (
    <ul>
      {groups.map((g) => (
        <Group group={g} key={g.id} />
      ))}
    </ul>
  );
};

export default GroupsList;
