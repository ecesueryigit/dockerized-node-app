require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err));

const Todo = require("./models/Todo");

const express = require("express");

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";


app.get("/", (req, res) => {
  res.send(`Hello DevOps from ${ENV} environment`);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", environment: ENV });
});


app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/todos", async (req, res) => {

  if (!req.body.title) {
    return res.status(400).json({ error: "title is required" });
  }

  try{
    const newTodo =  await Todo.create({
     
      title: req.body.title,
      completed: false
    });

    res.status(201).json({
    id: newTodo._id.toString(),
    title: newTodo.title,
    completed: newTodo.completed,
    createdAt: newTodo.createdAt,
    updatedAt: newTodo.updatedAt
  });

  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({ error: err.message });
    }

});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

module.exports = app;


