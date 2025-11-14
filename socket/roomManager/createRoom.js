import { getRoomData, registerRoom } from "../state.js";

const createRoomHandler = (io, socket, data) => {
  const { roomId, hostName, avatar, difficulty, gameMode } = data;

  if (getRoomData(roomId)) {
    console.log("Room already exists! - ", roomId);
    return;
  }

  const newRoom = {
    hostId: socket.id,
    hostName,
    players: [
      {
        id: socket.id,
        name: hostName,
        avatar,
        progress: 0,
        wpm: 0,
        accuracy: 0,
        isCompleted: false,
        timeTaken: null,
      },
    ],
    difficulty,
    gameMode,
    gameState: "waiting", //waiting || starting || started || finished
    createdAt: Date.now(),
  };

  registerRoom(roomId, newRoom);
  socket.join(roomId);

  console.log(`Room created: ${roomId} by ${hostName}`);
};

export default createRoomHandler;
