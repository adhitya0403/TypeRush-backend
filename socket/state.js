// all rooms data
const rooms = new Map();

// storing room data in map when room is created
export const registerRoom = (roomId, data) => {
  rooms.set(roomId, data);
};

// to get particular room data by roomId
export const getRoomData = (roomId) => {
  return rooms.get(roomId);
};

// updates room data like no.of players, progress etc...
export function updateRoom(roomId, newData) {
  const existing = rooms.get(roomId);
  rooms.set(roomId, { ...existing, ...newData });
}

// delets room data from map
export function deleteRoom(roomId) {
  rooms.delete(roomId);
}

// all rooms data
export function getAllRooms() {
  return Array.from(rooms.values());
}

// all room id's
export function getAllRoomIds() {
  return Array.from(rooms.keys());
}
