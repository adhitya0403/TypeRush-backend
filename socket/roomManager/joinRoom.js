import { getRoomData, updateRoom } from "../state.js";
import broadcastRoomUpdate from "../utils/broadCast.js";

const joinRoomHandler = (io, socket, data) => {
  const { roomId, avatar, name } = data;

  const roomData = getRoomData(roomId);

  // broadcast to user if room not exits
  if (!roomData) {
    socket.emit("error", "Room not found!");
    return;
  }

  // if the game is started by room host
  if (roomData.gameState !== "waiting") {
    socket.emit("error", "Game already started!");
    return;
  }


  const newPlayer = {
    id: socket.id,
    name,
    avatar,
    progress: 0,
    wpm: 0,
    accuracy: 0,
    isCompleted: false,
    timeTaken: null,
  };
  roomData.players.push(newPlayer);

  updateRoom(roomId, roomData);

  socket.join(roomId);

  socket.emit("joinedRoom", { roomId });

  // used to show update player when joined
  broadcastRoomUpdate(io, roomId);
};

export default joinRoomHandler;