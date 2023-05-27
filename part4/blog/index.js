const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const PORT = config.PORT;

app.listen(PORT, () => {
  logger.informationLog(`Server is running on Port ${PORT}`);
});
