const PersonForm = ({
  handleSubmit,
  newName,
  updateName,
  newNumber,
  updateNumber,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>name:</label>
        <input value={newName} onChange={updateName}></input>
        <br></br>
        <label>number:</label>
        <input value={newNumber} onChange={updateNumber}></input>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
