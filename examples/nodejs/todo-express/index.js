const express = require("express");
const app = express();

app.use(express.json());

let todos = [];

// 获取任务
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 新建任务
app.post("/todos", (req, res) => {
  const todo = { id: Date.now(), text: req.body.text };
  todos.push(todo);
  res.json(todo);
});

// 删除任务
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id != req.params.id);
  res.send("Deleted");
});

app.listen(3000, () => {
  console.log(`Todo API running at http://localhost:3000`);
});
