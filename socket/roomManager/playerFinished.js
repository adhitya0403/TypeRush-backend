import { getRoomData } from "../state.js";

const playerFinishedHandler = (io, socket, data) => {
  const { roomId, wpm, accuracy, time } = data;
  const room = getRoomData(roomId);
  if (!room) return;

  const player = room.players.find((p) => p.id === socket.id);
  if (!player) return;

  player.wpm = wpm;
  player.accuracy = accuracy;
  player.timeTaken = time;
  player.isCompleted = true;

  const finishedPlayers = room.players.filter((p) => p.isCompleted);

  if (room.gameMode === "Tournament") {
    if (finishedPlayers.length === room.players.length) {
      room.gameState = "finished";

      const topPlayers = [...finishedPlayers]
        .sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy)
        .slice(0, 5);

      io.to(roomId).emit("gameOver", {
        allPlayers: topPlayers.map((p) => ({
          id: p.id,
          name: p.name,
          wpm: p.wpm,
          avatar: p.avatar,
          accuracy: p.accuracy,
          time: p.timeTaken,
        })),
        gameMode: room.gameMode,
      });
    } else {
      socket.emit("waitingForOthers");
    }
  } else {
    if (finishedPlayers.length === 1) {
      room.gameState = "finished";

      io.to(roomId).emit("gameOver", {
        allPlayers: [
          {
            id: player.id,
            name: player.name,
            avatar: player.avatar,
          },
        ],
        gameMode: room.gameMode,
      });
    } else {
      socket.emit("waitingForOthers");
    }
  }
};

export default playerFinishedHandler;
