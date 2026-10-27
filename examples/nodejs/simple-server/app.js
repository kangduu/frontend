const http = require("node:http");
const url = require("node:url");

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;

  switch (pathname) {
    case "/":
      res.end("首页", "utf-8");
      break;
    case "/about":
      res.end("这是关于页面");
      break;
    case "/time":
      res.end("当前时间：" + new Date().toLocaleString());
      break;
    default:
      res.statusCode = 404;
      res.end("404 Not Found");
      break;
  }
});

server.listen(3000, () => {
  console.log("服务器运行在 http://localhost:3000");
});
