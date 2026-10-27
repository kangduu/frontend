const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const PORT = 3000;

// 公共数据
const data = { title: "多模板引擎示例", user: { name: "花生", age: 3 } };

// ========== EJS ==========
app.engine("ejs", require("ejs").__express);

// ========== Pug ==========
app.engine("pug", require("pug").__express);

// ========== Handlebars ==========
app.engine("handlebars", engine());

// ========== 路由 ==========
// EJS
app.get("/ejs", (req, res) => {
  res.render("ejs-demo.ejs", data);
});

// Pug
app.get("/pug", (req, res) => {
  res.render("pug-demo.pug", data);
});

// Handlebars
app.get("/hbs", (req, res) => {
  res.render("hbs-demo.handlebars", data);
});

// 首页提示
app.get("/", (req, res) => {
  res.send(`
    <h2>多模板引擎对比</h2>
    <ul>
      <li><a href="/ejs">EJS</a></li>
      <li><a href="/pug">Pug</a></li>
      <li><a href="/hbs">Handlebars</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`服务器运行中: http://localhost:${PORT}`);
});
