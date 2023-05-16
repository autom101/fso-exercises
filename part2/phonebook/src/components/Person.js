const Person = ({ person, deletePerson }) => {
  return (
    <>
      <li>
        {person.name} {person.number}
      </li>
      <button
        onClick={() => {
          deletePerson(person.name, person.id);
        }}
      >
        Delete
      </button>
    </>
  );
};

export default Person;
