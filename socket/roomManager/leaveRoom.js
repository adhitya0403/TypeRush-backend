// socket/roomManager/leaveRoomHandler.js
import { getRoomData, updateRoom, deleteRoom } from "../state.js";
import broadcastRoomUpdate from "../utils/broadCast.js";

const leaveRoomHandler = (io, socket, data) => {
  const { roomId } = data;

  const room = getRoomData(roomId);
  if (!room) return;

  // Remove player from room
  const playerIndex = room.players.findIndex((p) => p.id === socket.id);
  if (playerIndex === -1) return; // player not found (maybe already removed)

  const leavingPlayer = room.players[playerIndex];
  room.players.splice(playerIndex, 1);

  console.log(`${leavingPlayer.name} left room ${roomId}`);

  // If no players left delete the room
  if (room.players.length === 0) {
    deleteRoom(roomId);
    console.log(`Room ${roomId} deleted`);
    return;
  }

  // If the host left make new one
  if (room.hostId === leavingPlayer.id) {
    const newHost = room.players[0];
    room.hostId = newHost.id;
    room.hostName = newHost.name;
  }

  // save upadated data
  updateRoom(roomId, room);

  socket.leave(roomId);

  // notify room updates (here player left)
  broadcastRoomUpdate(io, roomId);
};

export default leaveRoomHandler;
