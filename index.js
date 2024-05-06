const express = require("express");
const scoketIo = require("socket.io");
const http = require("http");
const path = require("path");

// express
const app = express();
const server = http.createServer(app);
app.use(express.static(path.resolve(__dirname, "public")));

// webSocket
const io = scoketIo(server);

io.on("connection", (socket) => {
  // 当有一个新的客户端连接到服务器时，触发connection事件
  console.log("新的客户端连接进来");
  socket.on("message", (msg) => {
    // 当客户端向服务器发送消息时，触发message事件
    console.log(msg);
    socket.emit("message", "服务器返回的消息");
  });
  let  timer = setInterval(() => {
    socket.emit("message", "服务器向客户端发送消息");
  }, 1000);
  socket.on("disconnect", () => {
    console.log("客户端断开连接");
    timer = null;
  });
});

// 监听端口
server.listen(3000, () => {
  console.log("server is running at port 3000");
});
