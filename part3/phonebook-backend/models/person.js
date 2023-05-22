const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((response) => {
    console.log("Connected to the MongoDB database!");
  })
  .catch((error) => {
    console.log("Error while connecting to MongoDB database: ", error.message);
  });

const personsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

personsSchema.set("toJSON", {
  transform: (document, requestedObj) => {
    requestedObj.id = requestedObj._id.toString();
    delete requestedObj._id;
    delete requestedObj.__v;
  },
});

const Person = mongoose.model("Person", personsSchema);

module.exports = Person;
