import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  // Real-time Chat Logic
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on("send_message", (data) => {
      // Broadcast to everyone in the room
      io.to(data.room).emit("receive_message", {
        text: data.text,
        sender: data.sender,
        timestamp: new Date().toISOString()
      });
      
      // Also broadcast a global "new_chat" event for the artist to see notifications
      io.emit("new_chat_notification", {
        room: data.room,
        text: data.text,
        sender: data.sender
      });
    });

    socket.on("typing", (data) => {
      socket.to(data.room).emit("user_typing", { sender: data.sender });
    });

    socket.on("stop_typing", (data) => {
      socket.to(data.room).emit("user_stop_typing", { sender: data.sender });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
