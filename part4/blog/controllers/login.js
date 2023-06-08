const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    const checkIfPasswordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!user && !checkIfPasswordCorrect) {
      return response.status(401).json({
        error: "Username and password does not match any existing user",
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
      .status(201)
      .send({ token: token, username: username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
