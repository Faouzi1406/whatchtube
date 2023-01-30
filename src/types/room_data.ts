import { Room } from "@prisma/client"
import { User } from "@prisma/client";

export type RoomData = {
  id:String,
  room: Room | null,
  message: String
}

export type RoomMessages = { 
  user:User, 
  message:String  
};


export type ROOM = {
  roomId:String, 
  messages:RoomMessages[]
}
