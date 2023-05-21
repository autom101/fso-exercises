const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Error! Number of arguments was less than 3. Please pass in, at minimum, the password!"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phonebookUser:${password}@cluster0.jyo17ve.mongodb.net/persons?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personsSchema);

const findPeople = () => {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
};

const addPerson = () => {
  const personName = process.argv[3];
  const personNumber = process.argv[4];

  const person = new Person({
    id: 1,
    name: personName,
    number: personNumber,
  });

  person.save().then((result) => {
    console.log(`added: ${personName} number ${personNumber} to phonebook`);
    mongoose.connection.close();
  });
};

if (process.argv.length == 3) {
  findPeople();
}

if (process.argv.length == 5) {
  addPerson();
}
