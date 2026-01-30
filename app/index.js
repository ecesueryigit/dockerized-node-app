const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

app.get("/", (req, res) => {
  res.send(`Hello DevOps from ${ENV} environment`);
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", environment: ENV });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${ENV} mode`));