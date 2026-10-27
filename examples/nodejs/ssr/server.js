const express = require("express");
const { JSDOM } = require("jsdom");

const app = express();

// 设置 ejs 视图引擎
app.set("view engine", "ejs");

app.use(express.static("public"));

// 首页路由，渲染index.ejs，动态数据
app.get("/", (req, res) => {
  const items = ["apple", "banana", "orange"];
  res.render("pages/index", { title: "主页", items });
});

// 关于页路由：渲染 about.ejs
app.get("/about", (req, res) => {
  res.render("pages/about", {
    title: "关于我们",
    info: "这是一个多页面 SSR 示例。",
  });
});

// 用户页路由：根据 URL 参数渲染 user.ejs
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  // 模拟用户数据（现实场景可从数据库或接口获取）
  const user = { id: userId, name: "用户" + userId, age: 20 + Number(userId) };
  res.render("pages/user", { title: "用户详情", user });
});

// 演示使用 jsdom 在服务端操作 DOM（例如在首页内容后追加一段文字）
app.get("/jsdom-demo", (req, res) => {
  // 先渲染模板为 HTML 字符串，然后用 jsdom 解析
  res.render(
    "pages/index",
    { title: "主页 (jsdom 示例)", items: ["A", "B", "C"] },
    (err, html) => {
      if (err) throw err;
      // 使用 jsdom 解析 HTML
      const dom = new JSDOM(html);
      const document = dom.window.document;
      // 在 <body> 末尾插入一段新节点
      const p = document.createElement("p");
      p.textContent = "（这段文字由 jsdom 在服务端动态插入）";
      document.body.appendChild(p);
      // 序列化并发送修改后的完整 HTML:contentReference[oaicite:2]{index=2}
      res.send(dom.serialize());
    }
  );
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`服务器已启动，http://localhost:${PORT}`));
