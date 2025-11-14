// socket/roomManager/getRoomState.js
import { getRoomData } from "../state.js";

const getRoomStateHandler = (io, socket, data) => {
  const { roomId } = data;
  const room = getRoomData(roomId);

  if (!room) {
    return;
  }

  socket.emit("roomState", {
    players: room.players,
    hostId: room.hostId,
    hostName: room.hostName,
    gameMode: room.gameMode,
    gameState: room.gameState,
    difficulty: room.difficulty,
  });
};

export default getRoomStateHandler;
