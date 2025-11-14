import { getRoomData, updateRoom } from "../state.js";
import broadcastRoomUpdate from "../utils/broadCast.js";

const progressHandler = (io, socket, data) => {
  const { roomId, progress } = data;

  const room = getRoomData(roomId);
  if (!room) return;

  // find player in room
  const playerIndex = room.players.findIndex((p) => p.id === socket.id);
  if (playerIndex === -1) return;

  // update player progress
  room.players[playerIndex].progress = progress;

  // update the room data in state
  updateRoom(roomId, { players: room.players });

  // broadcast updated leaderboard to everyone in the room
  broadcastRoomUpdate(io, roomId);
};

export default progressHandler;
