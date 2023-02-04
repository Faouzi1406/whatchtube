import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { LogoutIcon , RoomIcon } from "../../Icons/HeroIcons";
import Image from "next/image";
import Notification from '../notifications/Notification';

export type Menu = "open" | "closed";

const NavBar = () => {
  const session = useSession();
  if (session.status != "loading", session.status == "authenticated") {
    return <nav className="bg-main w-full h-14 shadow-md flex items-center px-5">
      <DropDown />
    </nav>
  }
  if (session.status != "loading", session.status == "unauthenticated") {
    signIn()
    return <div>Pleass sign in if you see this</div>
  }

  return <div>Loading</div>
}

const DropDown = () => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState<Menu>("closed");

  return <>
    <div className="grow">
      <h1 className="font-bold text-white text-2xl">Watch-Tube</h1>
    </div>
    <div className="text-white mr-3">
      <Notification />
    </div>
    <div className="relative">
      <img src={session.data?.user?.image || 'loading'}
        className={"rounded-full w-10 hover:cursor-pointer border select-none"}
        onClick={() => isOpen == "closed" ? setIsOpen("open") : setIsOpen("closed")}
      />
      {/* @ts-ignore  */}
      <DropDownMenu isOpen={isOpen} userName={session.data?.user?.name} userImage={session.data?.user?.image} />
    </div>
  </>
}

export const DropDownMenu = ({ isOpen, userName, userImage }: { isOpen: Menu, userName: String, userImage: string }) => {
  if (isOpen == "open") {
    return <div className="absolute flex right-3 mt-1 shadow-md z-50">
      <div className="justify-start bg-secondary text-white rounded-md p-2 w-60">
        <div className="flex items-center gap-2">
          <Image
            src={userImage}
            alt="Icon"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p>@{userName}</p>
        </div>
        {/* items */}
        <p className="font-semibold text-center text-lg">Actions</p>
        <hr className="py-1" />
        <CreateRoomMenuTab />

        <p className="font-semibold text-center text-lg mt-5">Account</p>
        <hr className="py-1" />
        <LogoutMenuTab />
      </div>
    </div>
  } else {
    <div className="hidden"></div>
  }
}

export const CreateRoomMenuTab = () => {
  return <div className="">
    <Link href={"/create-room"} className="flex items-center gap-2 font-semibold">
      <RoomIcon />
      Create room
    </Link>
  </div>
}

export const LogoutMenuTab = () => {
  return <>
    <button className="flex items-center gap-2 font-semibold" onClick={() => signOut()}>
      <LogoutIcon />
      Logout
    </button>
  </>
}

export default NavBar;
