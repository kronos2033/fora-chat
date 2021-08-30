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

app.post("/chats/:id", (req, res) => {
  const { id } = req.params;
  if (!chats.has(id)) {
    chats.set(
      id,
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
    const id = `${chatId}`;
    if (!username) {
      username = `Гость ${String(socket.id).slice(-2)}`;
    }
    socket.join(id);
    chats.get(id).get("users").set(socket.id, username);
    const obj = {
      users: [...chats.get(id).get("users").values()],
      messages: [...chats.get(id).get("messages").values()],
      username,
    };
    io.in(id).emit("join in chat", obj);
  });

  socket.on("new message", ({ chatId, username, text, time }) => {
    console.log(chatId);
    const id = `${chatId}`;
    const obj = {
      username,
      text,
      time,
    };
    chats.get(id).get("messages").push(obj);
    io.in(id).emit("new message", obj);
  });

  socket.on("disconnect", () => {
    chats.forEach((value, chatId) => {
      let id = `${chatId}`;
      if (value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        io.in(id).emit("disconnect user", users);
      }
    });
  });
});

server.listen(9999, () => {
  console.log("server in work");
});
