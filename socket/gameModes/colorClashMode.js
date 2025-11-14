import { updateRoom, deleteRoom } from "../state.js";

const handleColorClash = async (io, socket, data) => {
  const { roomId, difficulty, gameMode } = data;
  const timeLimit = 40000;

  io.to(roomId).emit("serverStatus", "waking");

  const timeout = setTimeout(() => {
    io.to(roomId).emit("serverStatus", "error");
    io.socketsLeave(roomId);
    deleteRoom(roomId);
  }, timeLimit);

  try {
    const rounds =
      difficulty === "Easy" ? 10 : difficulty === "Medium" ? 15 : 20;

    clearTimeout(timeout);

    updateRoom(roomId, {
      gameState: "started",
      totalRounds: rounds,
      currentRound: 1,
    });

    const startTime = Date.now() + 5000;

    io.to(roomId).emit("gameStarted", {
      roomId,
      gameMode,
      startTime,
      serverTime: Date.now(),
      payload: {
        rounds,
      },
    });
  } catch (err) {
    clearTimeout(timeout);
    io.to(roomId).emit("serverStatus", "error");
    io.socketsLeave(roomId);
    deleteRoom(roomId);
  }
};

export default handleColorClash;
