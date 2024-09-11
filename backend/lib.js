const randomSleep = (min, max) => {
  return new Promise((res) => {
    setTimeout(() => {
      res("");
    }, Math.floor(Math.random() * (max - min + 1)) + min);
  });
};

module.exports = { randomSleep };
