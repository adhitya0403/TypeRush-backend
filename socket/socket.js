import roomHandler from "./roomHandler.js";
import startGameHandler from "./roomManager/startGameHandler.js";
import progressHandler from "./roomManager/progressHandler.js";
import roundProgressHandler from "./roomManager/roundProgressHandler.js";
import playerFinishedHandler from "./roomManager/playerFinished.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {

    roomHandler(io, socket);

    socket.on("startGame", (data) => startGameHandler(io, socket, data));
    socket.on("updateProgress", (data) => progressHandler(io, socket, data));
    socket.on("updateRound", (data) => roundProgressHandler(io, socket, data));
    socket.on("playerFinished", (data) => playerFinishedHandler(io, socket, data));
  });
};

export default socketHandler;
