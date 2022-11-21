const Filter = ({ value, handleChange }) => {
  return (
    <div>
      Filter list: <input value={value} onChange={handleChange} />
    </div>
  );
};

export default Filter;
