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

app.get("/chats/:id", (req, res) => {
  const { id: chatId } = req.params;

  const obj = chats.has(chatId)
    ? {
        users: [...chats.get(chatId).get("users").values()],
        messages: [...chats.get(chatId).get("messages").values()],
      }
    : { users: [], messages: [] };
  res.send(obj);
});

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
    console.log(chatId, username);
    socket.join(chatId);
    chats.get(chatId).get("users").set(socket.id, username);
    const users = [...chats.get(chatId).get("users").values()];
    socket.broadcast.to(chatId).emit("update user", users);
  });
  socket.on("disconnect", () => {
    chats.forEach((value, chatId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        socket.broadcast.to(chatId).emit("update user", users);
      }
    });
  });
});

server.listen(9999, () => {
  console.log("server in work");
});
