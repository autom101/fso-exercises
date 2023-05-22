require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person.js");

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
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/info", (request, response) => {
  Person.find({}).then((persons) => {
    const date = new Date();
    const numOfPeopleInfo = `<p>The phonebook has information for ${persons.length} people</p><p>${date}</p>`;
    response.send(numOfPeopleInfo);
  });
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = request.params.id;
  Person.findbyId({ id }).then((person) => {
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
  const receivedInfo = request.body;

  if (!receivedInfo.name || !receivedInfo.number) {
    response
      .status(400)
      .json("Missing name or number. Please input a name and a number!");
  }

  const person = new Person({
    id: newId,
    name: receivedInfo.name,
    number: receivedInfo.number,
  });

  person
    .save()
    .then((returnedObj) => {
      response.json(returnedObj);
    })
    .catch((error) => {
      response.status(400).json("Error: ", error);
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}\n`);
});
