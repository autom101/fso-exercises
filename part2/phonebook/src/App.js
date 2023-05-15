import axios from "axios";
import { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import Person from "./components/Person.js";
import PersonForm from "./components/PersonForm.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "069-42069", id: "1" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const obj of persons) {
      if (obj.name === newName) {
        alert(`${newName} is already in the phone book!`);
        return;
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const personsCopy = [...persons, newPerson];
    setPersons(personsCopy);
    setNewName("");
    setNewNumber("");
    setFilter("");
  };

  const updateName = (e) => {
    setNewName(e.target.value);
  };

  const updateNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const updateFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredPersons = persons.filter((person) => {
    return person.name.includes(filter);
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={updateFilter} />
      <h2>Add new entry</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        updateName={updateName}
        newNumber={newNumber}
        updateNumber={updateNumber}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => {
          return <Person key={person.name} person={person} />;
        })}
      </ul>
    </div>
  );
};

export default App;
