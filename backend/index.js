const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { randomSleep } = require("./lib");

const PORT = process.env.PORT || 3001;

const app = express();

const limiter = rateLimit({
  windowMs: 1000,
  max: 50,
  message: "Too many requests",
});

app.use(cors());
app.use(limiter);

app.get("/api", limiter, async (req, res) => {
  await randomSleep(1, 1000);

  res.json({
    index: Number(req.query.index),
  });
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
