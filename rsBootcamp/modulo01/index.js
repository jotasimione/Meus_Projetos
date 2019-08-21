const express = require("express");
const server = express();
server.listen(3000);

const users = ["José", "Carol", "Vitor", "Nicoly"];

server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});
