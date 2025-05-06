import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

// ✅ Create raw HTTP server
const server = http.createServer(app);

// ✅ Attach Socket.IO to that HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Allow frontend to access server
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (msgData) => {
    console.log("Message from", msgData.sender, ":", msgData.text);
    socket.broadcast.emit("displayMessage", msgData);
  });
  

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ Start server
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
