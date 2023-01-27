import { UseQueryResult } from "@tanstack/react-query";
import { useSession } from "next-auth/react"
import { useState } from "react";
import { NotificationIcon } from "../../Icons/HeroIcons";
import { api } from "../../utils/api";
import { type Menu } from "../navigation/NavBar";

const Notification = () => {
  const user = useSession();
  const userId = user.data?.user?.id;
  const [dropDown, displayDropDown] = useState<Menu>('open');
  const notificationsInvites = api.notificationsApi.getUserNotifications.useQuery();

  return <>
    <div>
      <div onClick={() => dropDown == 'closed' ? displayDropDown('open') : displayDropDown('closed')}>
        <NotificationIcon />
      </div>
      <div className="relative">
        <NotificationsDropDown isOpen={dropDown} roomNotifications={notificationsInvites} />
      </div>
    </div>
    <div>
    </div>
  </>
}

const NotificationsDropDown = ({ isOpen, roomNotifications }: { isOpen: Menu, roomNotifications: UseQueryResult }) => {
  if (isOpen == 'open') {
    return <div className="absolute bg-secondary p-2 rounded-md flex items-start top-2 right-3 w-96 flex-col border shadow-md">
      <p className="font-bold">All your notifications!</p>
      <RoomNotifications roomNotifications={roomNotifications} /> 
    </div>
  }
  else {
    return <></>
  }
}

const RoomNotifications = ({ roomNotifications }: { roomNotifications: UseQueryResult }) => {
  console.log(roomNotifications.data)
  if (!roomNotifications.isLoading) {
    return <div className="w-full">
      {
        roomNotifications.data.invites.map(e => {
          return <div key={e.inviteId} className="p-2 rounded-md mb-2 w-full mt-4 shadow-xl rounded-md">
            <p className="mb-2 font-bold"> {
              e.room.roomName
            }
            </p>
            <div className="flex gap-3">
              <button className="bg-green-400 p-2 rounded-md border border-green-900">Join room</button>
              <button className="bg-red-400 border border-red-900 p-2 rounded-md">Remove</button>
            </div>
            <div className="text-white font-bold bg-gray-400  p-1 rounded-md mt-2 flex items-end w-full">
              <p>Room Invite</p>
            </div>
          </div>
        })
      }
    </div>
  } else {
    return <div>Loading ...</div>
  }
}


export default Notification;
