const express = require("express");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
app.use(express.json());
const chats = new Map();

app.get("/", (req, res) => res.send(obj));

app.post("/chats", (req, res) => {
  const { chatId } = req.body;
  if (!chats.has(chatId)) {
    chats.set(
      chatId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }
  res.json([...chats.keys()]);
});

io.on("connection", (socket) => {
  socket.on("join user", ({ chatId, username }) => {
    socket.join(chatId);
    chats.get(chatId).get("users").set(socket.id, username);
    const obj = {
      users: [...chats.get(chatId).get("users").values()],
      messages: [...chats.get(chatId).get("messages").values()],
    };
    io.in(chatId).emit("join in chat", obj);
  });

  socket.on("new message", ({ chatId, username, text }) => {
    const obj = {
      username,
      text,
    };
    chats.get(chatId).get("messages").push(obj);
    io.in(chatId).emit("new message", obj);
  });

  socket.on("disconnect", () => {
    chats.forEach((value, chatId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        io.in(chatId).emit("disconnect user", users);
      }
    });
  });
});

server.listen(9999, () => {
  console.log("server in work");
});
