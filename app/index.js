const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

const DATA_FILE = "todos.json";

let todos = [];

if (fs.existsSync(DATA_FILE)) {
	const data = fs.readFileSync(DATA_FILE);
	todos = JSON.parse(data);
}

app.get("/", (req, res) => {
  res.send(`Hello DevOps from ${ENV} environment`);
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", environment: ENV });
});


app.get("/todos" , (req, res) => {
	res.json(todos);
});
app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false
  };

  todos.push(newTodo);
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos));

  res.status(201).json(newTodo);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${ENV} mode`));
