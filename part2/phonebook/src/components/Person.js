const Person = ({ person, deletePerson }) => {
  return (
    <div className="list-item">
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
    </div>
  );
};

export default Person;
