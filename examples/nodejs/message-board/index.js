const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Message = require("./models/Message");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("MongoDB connect fail"));

// 获取留言
app.get("/messages", async (req, res) => {
  const messages = await Message.find().sort({ createAt: -1 });
  res.json(messages);
});
// 发布留言
app.post("/messages", async (req, res) => {
  const { user, content } = req.body;
  const msg = new Message({ user, content });
  await msg.save();
  res.json(msg);
});
// 删除留言
app.delete("/messages/:id", async (req, res) => {
  const { id } = req.params;
  await Message.findByIdAndDelete(id);
  res.send("删除成功");
});

app.listen(process.env.PORT, () => {
  console.log(`message board running at http://localhost:${process.env.PORT}`);
});
