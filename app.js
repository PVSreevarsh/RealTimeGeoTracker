const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const PORT = 3000;
const path = require("path");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("received-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Listening to port:", PORT);
});
