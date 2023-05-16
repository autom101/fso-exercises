import personsService from "./services/persons.js";

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

  const clearFields = () => {
    setNewName("");
    setNewNumber("");
    setFilter("");
  };

  useEffect(() => {
    personsService.getData().then((response) => {
      setPersons(response);
      clearFields();
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isInsidePersons = false;
    for (const obj of persons) {
      if (obj.name === newName) {
        const objToChange = { ...obj };
        isInsidePersons = true;

        if (
          window.confirm(
            `${newName} is already in the phone book. Do you want to replace the old number with a new one?`
          )
        ) {
          objToChange.number = newNumber;
          const objToChangeID = objToChange.id;

          personsService
            .replaceData(objToChange, objToChangeID)
            .then((response) => {
              const newPersons = persons.map((person) => {
                return person.id !== objToChange.id ? person : response;
              });
              setPersons(newPersons);
              clearFields();
            });
        }
      }
    }

    if (!isInsidePersons) {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personsService.postData(newPersonObject).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
      });
    }
    clearFields();
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

  const deletePerson = (name, id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const personToDelete = persons.find((person) => person.id === id);
      const deletedPersonIndex = persons.findIndex(
        (person) => person === personToDelete
      );
      personsService.deleteData(personToDelete, id).then((response) => {
        const copyPersons = [...persons];
        copyPersons.splice(deletedPersonIndex, 1);
        setPersons(copyPersons);
        clearFields();
      });
    }
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
          return (
            <Person
              key={person.id}
              person={person}
              deletePerson={deletePerson}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
