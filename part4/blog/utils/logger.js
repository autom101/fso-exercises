const informationLog = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const errorLog = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

module.exports = { informationLog, errorLog };
