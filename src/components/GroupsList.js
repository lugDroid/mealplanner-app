const Group = ({ group, deleteAction, showModifyForm }) => {
  return (
    <li>
      <p>{group.name}</p>
      <p>Weely Rations: {group.weeklyRations}</p>
      <button onClick={() => showModifyForm(group)}>Modify</button>
      <button onClick={() => deleteAction(group.id)}>Delete</button>
    </li>
  );
};

const GroupsList = ({ groups, deleteAction, showModifyForm }) => {
  return (
    <ul>
      {groups.map((g) => (
        <Group
          group={g}
          key={g.id}
          deleteAction={deleteAction}
          showModifyForm={showModifyForm}
        />
      ))}
    </ul>
  );
};

export default GroupsList;
