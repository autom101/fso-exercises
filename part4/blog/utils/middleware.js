const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.informationLog("-----Begin request log-----");
  logger.informationLog("Body: ", request.body);
  logger.informationLog("Method: ", request.method);
  logger.informationLog("Path ", request.path);
  logger.informationLog("-----End request log-----");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.errorLog(error);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
