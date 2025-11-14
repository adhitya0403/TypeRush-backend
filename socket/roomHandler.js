import createRoomHandler from "./roomManager/createRoom.js";
import joinRoomHandler from "./roomManager/joinRoom.js";
import getRoomStateHandler from "./roomManager/getRoomState.js";
import leaveRoomHandler from "./roomManager/leaveRoom.js";
import handleDisconnect from "./roomManager/handleDisconnect.js";

const roomHandler = (io, socket) => {
  socket.on("createRoom", (data) => createRoomHandler(io, socket, data));
  socket.on("joinRoom", (data) => joinRoomHandler(io, socket, data));
  socket.on("getRoomState", (data) => getRoomStateHandler(io, socket, data));
  socket.on("leaveRoom", (data) => leaveRoomHandler(io, socket, data));
  socket.on("disconnet", () => handleDisconnect(io, socket, data));
};

export default roomHandler;
