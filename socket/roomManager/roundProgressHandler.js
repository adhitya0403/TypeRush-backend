import { getRoomData, updateRoom } from "../state.js";
import broadcastRoomUpdate from "../utils/broadCast.js";

const roundProgressHandler = (io, socket, data) => {
  const { roomId, currentRound, isCorrect } = data;

  const room = getRoomData(roomId);
  if (!room) return;

  const playerIndex = room.players.findIndex((p) => p.id === socket.id);
  if (playerIndex === -1) return;

  room.players[playerIndex].score =
    (room.players[playerIndex].score || 0) + (isCorrect ? 1 : 0);
  room.players[playerIndex].progress =
    (currentRound / room.totalRounds) * 100 || 0;

  updateRoom(roomId, { players: room.players });

  broadcastRoomUpdate(io, roomId);
};

export default roundProgressHandler;
