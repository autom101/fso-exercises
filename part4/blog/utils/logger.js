const informationLog = (...params) => {
  console.log(...params);
};

const errorLog = (...params) => {
  console.error(...params);
};

module.exports = { informationLog, errorLog };
