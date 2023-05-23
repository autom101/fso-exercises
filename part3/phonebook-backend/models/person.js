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
  name: {
    type: String,
    minLength: [3, "The name must be at least 3 characters long!"],
    required: [true, "Please enter a name value!"],
  },
  number: {
    type: String,
    minLength: [8, "The phone numbers must be at least 8 characters long!"],
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d+/.test(4);
      },
      message: (props) => {
        `${props.value} is not in the correct format! Sample valid format: 09-1234556 OR 040-22334455`;
      },
    },
    required: [true, "Please enter a phone number"],
  },
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
