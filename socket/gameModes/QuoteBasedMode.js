import { fetchQuote } from "../utils/fetchQuote.js";
import { deleteRoom, updateRoom } from "../state.js";

const handleQuoteBasedMode = async (io, socket, data) => {
  const { roomId, difficulty, gameMode } = data;
  const timeLimit = 40000;

  io.to(roomId).emit("serverStatus", "waking");

  const timeout = setTimeout(() => {
    io.to(roomId).emit("serverStatus", "error");
    io.socketsLeave(roomId);
    deleteRoom(roomId);
  }, timeLimit);

  try {
    const diff =
      gameMode === "Echo Mode"
        ? "lower" 
        : difficulty === "Easy"
        ? "lower"
        : difficulty === "Medium"
        ? "upper"
        : "mixed";

    const quote = await fetchQuote(diff);

    clearTimeout(timeout);
    updateRoom(roomId, { gameState: "started", quote });

    io.to(roomId).emit("gameStarted", {
      roomId,
      startTime: Date.now() + 5000,
       serverTime: Date.now(),
      gameMode,
      payload: { quote },
    });
  } catch (err) {
    clearTimeout(timeout);
    io.to(roomId).emit("serverStatus", "error");
    io.socketsLeave(roomId);
    deleteRoom(roomId);
  }
};

export default handleQuoteBasedMode;
