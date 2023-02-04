import { useRouter } from "next/router";
import NavBar from "../../components/navigation/NavBar";
import { api } from "../../utils/api";
import { NextPage } from "next";
import { RoomData } from "../../types/room_data";
import { useSession, signIn } from "next-auth/react";
import { SendChatIcon } from "../../Icons/HeroIcons";
import { useState } from "react";
import { type Room, type Message } from "../../types/room_data";
import { io } from "socket.io-client";
import { z } from "zod";

const Room = (): JSX.Element => {
  const router = useRouter();
  const { roomid } = router.query;
  const userInfo = useSession();
  const { data: room } = api.rooms.getRoom.useQuery({ roomId: roomid });

  if (userInfo.status != 'loading' && userInfo.status == 'unauthenticated') {
    signIn()
  };

  if (room != undefined) {
    return <main className="h-screen bg-main">
      <div>
        <NavBar />
      </div>

      <div>
        <RoomBody room={room} />
      </div>
    </main>
  }

  return <></>;
}


const RoomBody = ({ room }: { room: RoomData }): JSX.Element => {
  return <>
    <div className="grid grid-cols-4   w-full h-screen">
      <YoutubeEmbed link={room.room?.roomLink || 'Error | NO LINK '} />
      <RoomChat room={room} link={room.room?.roomLink || ''} />
    </div>
  </>
}


const YoutubeEmbed = ({ link }: { link: string }): JSX.Element => {
  return <div className="w-full col-span-3">
    <iframe src={link} title="Youtube watch party" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="w-full h-full"></iframe>
  </div>
}

const RoomChat = ({ room, link }: { room: RoomData, link: String }) => {
  const user = useSession()
  const roomNeed = room;
  //@ts-ignore
  const [message, setMessage] = useState<Message>({ user: { user_name: user.data.user.name }, message: "" });

  const [rooms, setRooms] = useState<Room>({
    room_id: room.id,
    users: [],
    messages: [],
    current_link: link
  });

  //const joinRoom = api.joinRoom.joinRoom.useMutation();
  

  return <div className="border-l bg-main relative">
    <div className="w-full bg-secondary h-10  flex items-center justify-center shadow-md">
      <p className="font-bold text-white text-center">{room.room?.roomName}</p>
    </div>
    <div className="absolute bottom-0 w-full flex border-t shadow-md items-center">
      <div className="h-14">
        <img src={user.data?.user?.image ? user.data.user.image : ''} className="h-14 w-20 object-cover" />
      </div>
      <input className="bg-secondary w-full h-14 px-4  font-semibold text-white focus:outline-none" placeholder="Chat" />
      <button className="w-20 px-4 text-white flex items-center justify-end bg-secondary h-14" >
        <SendChatIcon />
      </button>
    </div>
  </div>
}

export default Room;

