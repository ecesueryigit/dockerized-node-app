const app = require("./index");

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} in ${ENV} mode`);
});
