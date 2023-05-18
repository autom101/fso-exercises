const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get(`/api/persons`, (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  const date = new Date();
  const numOfPeopleInfo = `<p>The phonebook has information for ${persons.length} people</p><p>${date}</p>`;
  response.send(numOfPeopleInfo);
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => {
    return person.id == id;
  });

  if (!person) {
    return response.status(400).end;
  }
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => {
    person.id != id;
  });
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const newId = Math.ceil(Math.random() * 2000000000000000);
  const newPerson = request.body;
  const uniqueName = !persons.find((person) => {
    return person.name === newPerson.name;
  });

  const errorMessage = { error: "" };

  if (!newPerson.name || !newPerson.number) {
    errorMessage.error = "Name and number fields cannot be empty";
  }

  if (!uniqueName) {
    errorMessage.error = "Name must be unique";
  }

  if (!errorMessage.error) {
    newPerson.id = newId;
    persons = [...persons, newPerson];
    response.json(newPerson);
  } else {
    response.status(400).json(errorMessage);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log("hi\n\n\n");
});
