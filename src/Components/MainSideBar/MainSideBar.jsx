import React from 'react'
import IconButton from "../IconButton";
import { HomeIcon, LockClosedIcon } from "@heroicons/react/solid";
import { ChatIcon, CogIcon, XIcon, ClipboardCheckIcon, CollectionIcon } from "@heroicons/react/outline";
import "../../FoodOrder/style.css"


function MainSideBarComponent(type) {
    const homeIcon = <HomeIcon className={`w-14 h-14 block ${type.type === "Home" ? "text-white" : "text-gray-500"}`} />;
    const kitchenIcon = <ClipboardCheckIcon className={`w-14 h-14 block ${type.type ==="Kitchen" ? "text-white" : "text-gray-500"}`} />
    const chatIcon = <ChatIcon className="w-14 h-14 text-gray-500 block" />;
    const cogIcon = <CogIcon className="w-14 h-14 text-gray-500 block" />;
    const closeIcon = <XIcon className="w-14 h-14 text-gray-500 block" />;
    const dashboardIcon = <CollectionIcon className={`w-14 h-14 block ${type.type === "Dashboard" ? "text-white" : "text-gray-500"}`} />;
    return (
        <>
        <div className="w-1/12 flex flex-col items-center relative justify-between pb-10">
          <div className="flex flex-col h-3/5 justify-around items-center">
            <img
              src={process.env.PUBLIC_URL + `/images/logo.png`}
              alt="LOGO"
              className="logo"
            />
            {(type.type === "Home") && (
              <IconButton icon={homeIcon} name={"Home"} active={true} />
            )} 
            {(type.type === "Kitchen") && (
              <IconButton icon={kitchenIcon} name={"Kitchen"} active={true} />
            )} 
            {(type.type === "Dashboard") && (
              <IconButton icon={dashboardIcon} name={"Dashboard"} active={true} />
            )} 
            <IconButton icon={chatIcon} name={"Chat"} active={type.type === "Chat"} />
            <IconButton icon={cogIcon} name={"Settings"} active={type.type === "Settings"} />
          </div>
          <IconButton icon={closeIcon} name={"Close"} active={false} />
        </div>
        </>
    )
}

export default MainSideBarComponent;