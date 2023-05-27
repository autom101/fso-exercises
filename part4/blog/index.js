const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 3003;

app
  .listen(PORT, () => {
    logger.info(`Server is running on Port ${PORT}`);
  })
  .catch((error) => {
    logger.errorLog(error);
  });
