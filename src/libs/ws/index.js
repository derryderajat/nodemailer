// src/ws/index.js
const socketIO = require("socket.io");

module.exports = (server) => {
  const io = socketIO(server);
};
