const express = require("express");
const fs = require("fs");
const path =require("path");

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

const dataDir = path.join(__dirname, "data");


if(!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true, mode: 0o777  });
}

const DATA_FILE = path.join(dataDir, "todos.json");

let todos = [];

if (fs.existsSync(DATA_FILE)) {
	const data = fs.readFileSync(DATA_FILE);
	todos = JSON.parse(data);
}

app.get("/", (req, res) => {
  res.send(`Hello DevOps from ${ENV} environment`);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", environment: ENV });
});


app.get("/todos" , (req, res) => {
	res.json(todos);
});

app.post("/todos", (req, res) => {

  if (!req.body.title) {
    return res.status(400).json({ error: "title is required" });
  }

  try{
    const newTodo = {
      id: todos.length + 1,
      title: req.body.title,
      completed: false
    };

    todos.push(newTodo);
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos));

    res.status(201).json(newTodo);
  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({ error: err.message });
    }

});

module.exports = app;


