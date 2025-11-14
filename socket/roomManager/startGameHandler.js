import handleQuoteBasedMode from "../gameModes/QuoteBasedMode.js";
import handleColorClash from "../gameModes/colorClashMode.js";

const startGameHandler = async (io, socket, data) => {
  const { roomId, gameMode } = data;

  if (!roomId) return;

  try {
    switch (gameMode) {
      case "Race":
      case "Tournament":
      case "Mirror Mode":
      case "Memory Mode":
      case "Echo Mode":
        await handleQuoteBasedMode(io, socket, data);
        break;

      case "Color Clash":
        await handleColorClash(io, socket, data);
        break;

      default:
        io.to(roomId).emit("serverStatus", "error");
    }
  } catch (err) {
    io.to(roomId).emit("serverStatus", "error");
  }
};

export default startGameHandler;
