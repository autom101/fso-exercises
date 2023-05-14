const Filter = ({ filter, updateFilter }) => {
  return (
    <>
      <form>
        <label>Filter values with: </label>
        <input value={filter} onChange={updateFilter}></input>
      </form>
    </>
  );
};

export default Filter;
