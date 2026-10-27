const express = require("express");
const { WebSocketServer } = require("ws");

const app = express();

const server = app.listen(3000, () =>
  console.log(`Server on http://localhost:3000`)
);

// 静态页面
app.get("/", (req, res) => {
  res.send(`
    <h2>聊天室</h2>
    <input id="msg" placeholder="输入消息" />
    <button onclick="send()">发送</button>
    <ul id="chat"></ul>
    <script>
      const ws = new WebSocket("ws://localhost:3000");
      ws.onmessage = e => {
        const li = document.createElement("li");
        li.innerText = e.data;
        document.getElementById("chat").appendChild(li);
      };
      function send(){
        const value = document.getElementById("msg").value;
        console.log(value);
        ws.send(value);
      }
    </script>
  `);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  // 发送欢迎消息
  ws.send("欢迎来到聊天室！");

  // 处理消息
  ws.on("message", (msg) => {
    console.log(`当前连接数: ${wss.clients.size}`); // 更准确的客户端计数方式

    // 广播消息给所有客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        if (typeof msg === "string" || Buffer.isBuffer(msg)) {
          // 验证消息类型
          client.send(msg.toString());
        }
      }
    });
  });

  // 处理错误
  ws.on("error", (error) => {
    console.error("WebSocket错误:", error);
  });

  // 处理连接关闭
  ws.on("close", () => {
    console.log("客户端断开连接");
    console.log(`剩余连接数: ${wss.clients.size}`);
  });
});
