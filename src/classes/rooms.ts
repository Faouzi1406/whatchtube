import { ROOM } from "../types/room_data";
import { User } from "@prisma/client";

export type RoomReturn = "room not found";

export class Rooms {
  rooms: ROOM[]

  constructor() {
    this.rooms = [];
  }

  getRoom(roomId: String): ROOM | RoomReturn {
    if (this.rooms.length == 0) {
      return "room not found"
    }

    return this.rooms.find(e => e.roomId == roomId)  || "room not found";
  }

  addRoom(room: ROOM) {
    this.rooms.push(room);
  }

  appendMessage(room:ROOM, message:String, user:User){
    let indexId = this.rooms.indexOf(room);
    this.rooms[indexId]?.messages.push({user, message});
  }
}
