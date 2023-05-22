require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Note = require("./models/note.js");

const app = express();

morgan.token("post-info", (request, response) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  } else {
    return "";
  }
});

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :post-info"
);

app.use(express.json());
app.use(logger);
app.use(cors());
app.use(express.static("../build"));

app.get(`/api/persons`, (request, response) => {
  Note.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/info", (request, response) => {
  Note.find({}).then((persons) => {
    const date = new Date();
    const numOfPeopleInfo = `<p>The phonebook has information for ${persons.length} people</p><p>${date}</p>`;
    response.send(numOfPeopleInfo);
  });
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = request.params.id;
  Note.findbyId({ id }).then((person) => {
    response.json(person);
  });
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}\n`);
});
