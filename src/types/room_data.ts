import { z } from "zod";
import { Room as RoomPrisma } from "@prisma/client"

export type User = {
  user_name:String
}

export const zodUser = z.object({
 user_name:z.string()
});

export type Message = {
  user:User,
  message:String
}

export const zodMessage = z.object({ 
 user:zodUser,
 message:z.string(),
});

export type Users = User[];

export const zodUsers = z.array(zodUser);

export type Messages = Message[];

export const zodMessages = z.array(zodMessage);

export type Room  = {
  room_id:String,
  users:Users,
  messages:Messages,
  current_link:String
}

export const zodRoom = z.object({
 room_id:z.string(),
 users:zodUsers,
 messages:zodMessages,
 current_link:z.string(),
});

export type RoomData = {
  id:String,
  room:RoomPrisma | null,
  message:string
}


// export type RoomData = {
//   room_id:
// }


//Rust structure :

// #[derive(Serialize, Deserialize)]
// pub struct User {
//     pub user_name: String,
// }

// #[derive(Serialize, Deserialize)]
// pub struct Users(Vec<User>);


// #[derive(Serialize, Deserialize)]
// pub struct Message {
//     pub user: User,
//     message: String,
// }


// #[derive(Serialize, Deserialize)]
// pub struct Messages(Vec<Message>);


// #[derive(Serialize, Deserialize)]
// pub struct Room {
//     pub room_id: String,
//     pub users: Users,
//     pub messages: Messages,
//     pub current_link: String,
// }

// #[derive(Serialize, Deserialize)]
// pub struct Rooms(pub Vec<Room>);
