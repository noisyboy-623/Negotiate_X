import React, { useState } from "react";
import {RiLogoutBoxLine, RiSkipLeftLine, RiSkipRightLine, RiHome2Line, RiGamepadLine, RiMedalLine, RiDashboardHorizontalLine} from "@remixicon/react"
import { useAuth } from "../../auth/hook/useAuth";

const Sidebar = ({stage,setStage}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { handleLogout } = useAuth();
  const menuItems = [
    { icon: <RiHome2Line />, label: "HOME", key: "home" },
    { icon: <RiGamepadLine />, label: "NEW GAME", key: "selection" },
    { icon: <RiMedalLine />, label: "LEADERBOARD", key: "leaderboard" },
    // { icon: <RiDashboardHorizontalLine />, label: "DASHBOARD", key: "dashboard" },
  ];



  return (
    <div
      className={` left-0 top-16 h-[calc(100vh-64px)] bg-black border-r border-gray-800 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}
    >
      <div className="p-4 h-full flex flex-col">
        {/* MENU ITEMS */}
        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setStage(item.key)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                stage === item.key
                  ? "bg-[#02C173] text-black font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              } ${!isOpen && "justify-center"}`}
              title={!isOpen ? item.label : ""}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <button
  onClick={handleLogout}
  className={
    isOpen
      ? "px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300 shadow-md"
      : " py-2 rounded-lg text-center text-white font-semibold hover:bg-red-700 transition-all duration-300 shadow-md flex items-center justify-center"
  }
>
  {isOpen ? "Log Out" : <RiLogoutBoxLine />}
</button>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center py-2 text-gray-400 hover:text-[#02C173] transition-colors"
        >
          {isOpen ? <RiSkipLeftLine /> : <RiSkipRightLine />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
