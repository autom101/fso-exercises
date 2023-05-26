const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.informationLog("-----Begin request log-----");
  logger.informationLog(
    `Method: ${request.method}\nPath: ${request.path}\nBody:${request.body}`
  );
  logger.informationLog("-----End request log-----");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.errorLog(error);
  next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
