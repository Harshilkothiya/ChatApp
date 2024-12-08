const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 8000;

// Server
const server = http.createServer(app);

// Path for static files
app.use(express.static(__dirname + "/public"));

// Socket
const io = new Server(server);

// Store a list of connected users
let users = [];

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  // When a user joins, add them to the list and notify others
  socket.on("new-user", (username) => {
    users.push({ id: socket.id, username });
    console.log("User connected:", username);
    io.emit("update-userlist", users); // Broadcast updated user list to all clients
  });

  // When a user disconnects, remove them from the list
  socket.on("disconnect", () => {
    users = users.filter((user) => user.id !== socket.id);
    console.log("User disconnected:", socket.id);
    io.emit("update-userlist", users); // Broadcast updated user list to all clients
  });

  // Handle messages----> user send message 
  socket.on("message", (msg) => {
    // console.log("Server received:", msg);
    socket.broadcast.emit("message", msg); // Broadcast message to other clients
  });

});

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Listen
server.listen(PORT, () => console.log("Server Started!", PORT));
