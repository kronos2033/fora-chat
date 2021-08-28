const express = require("express");

const app = express();
app.use(express.json());
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const rooms = new Map();

app.get("/rooms", (req, res) => res.send(rooms));

app.post("/rooms", (req, res) => {
  const { chatId, username } = req.body;
  if (!rooms.has(chatId)) {
    rooms.set(
      chatId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }
  res.json([...rooms.keys()]);
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
});

server.listen(9999, () => {
  console.log("server in work");
});
