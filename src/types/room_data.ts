import { Room } from "@prisma/client"

export type RoomData = {
  id: String,
  room: Room | null,
  message: String
}

export type RoomMessages = {
  user: User,
  message: String
};

type User = {
  name?: string  | null | undefined,
  email?: string | null | undefined,
  image?: string | null | undefined

}

export type ROOM = {
  roomId: String,
  messages: RoomMessages[],
  users: User[],
  owner:  User
}
