import { useRouter } from "next/router";
import NavBar from "../../components/navigation/NavBar";
import { api } from "../../utils/api";
import { NextPage } from "next";
import { RoomData } from "../../types/room_data";

const Room = (): JSX.Element => {
  const router = useRouter();
  const { roomid } = router.query;
  const { data: room } = api.rooms.getRoom.useQuery({ roomId: roomid });

  return <main className="h-screen bg-main">
    <div >
      <NavBar />
    </div>

    <div>
      <RoomBody room={room} />
    </div>
  </main>
}

const RoomBody = ({ room }: { room: RoomData }): JSX.Element => {
  if (room != undefined) {
    return <>
      <div>
        <p className="font-bold text-white text-3xl py-5 pl-5"> {room.room?.roomName} </p>
      </div>
      <div>
        <YoutubeEmbed link={room.room?.roomLink || 'Error | NO LINK '} />
      </div>
    </>
  } else {
    return <></>
  }
}

const YoutubeEmbed = ({ link }: { link: string }): JSX.Element => {
  return <div>
    <iframe width="560" height="315" src={link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
  </div>
}

export default Room;
