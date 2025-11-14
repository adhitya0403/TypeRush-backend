import { getRoomData } from "../state.js";

const broadcastRoomUpdate = (io, roomId) => {
  const roomData = getRoomData(roomId);

  //players, hostId, hostName, gameMode, gameState, difficulty
  if (!roomData) return;

  io.to(roomId).emit("roomState", {
    players: roomData.players,
    hostName: roomData.hostName,
    hostId: roomData.hostId,
    gameState: roomData.gameState,
    gameMode: roomData.gameMode,
    difficulty: roomData.difficulty,
  });
};

export default broadcastRoomUpdate;
