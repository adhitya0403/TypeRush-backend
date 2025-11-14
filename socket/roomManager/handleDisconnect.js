import { getAllRooms } from "../state.js";

const handleDisconnect = (io, socket) => {
  const rooms = getAllRooms(); 
  for (const [roomId, room] of Object.entries(rooms)) {
    const index = room.players.findIndex(p => p.id === socket.id);
    if (index === -1) continue;

    const leavingPlayer = room.players.splice(index, 1)[0];

    // if host left make new one
    if (room.hostId === socket.id) {
      if (room.players.length > 0) {
        room.hostId = room.players[0].id; 
        room.hostName = room.players[0].name;
      } else {
        deleteRoom(roomId);
        console.log(`Room ${roomId} deleted`);
        return;
      }
    }

    // update room if players left
    updateRoom(roomId, room); 

    // updates for other room players
    broadcastRoomUpdate(io, roomId); 

    console.log(`${leavingPlayer.name} disconnected from ${roomId}`);
    break;
  }
};

export default handleDisconnect;
