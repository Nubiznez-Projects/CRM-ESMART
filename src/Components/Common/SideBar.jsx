import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/Logo.png";
import simplelogo from "../../Assets/simplelogo.png";
import profile from "../../Assets/profile.png";
import "../../App.css";
import Modal from "./Modal/Modal";
import { RiLogoutBoxFill } from "react-icons/ri";
import { TbSettingsCog } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
// import { MdNotificationsActive } from "react-icons/md";
// import { Popover } from "antd";

const Sidebar = ({
  isSidebarOpen,
  //setIsSidebarOpen,
  selectedModule,
  setSelectedModule,
}) => {
  const navigation = useNavigate();
  const user_name = "James Muriel";
  const user_email = "jamesmuriel12@gmail.com";
   const LoginUserId = sessionStorage.getItem("LoginUserId");
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [nearbyModules, setNearbyModules] = useState({
    up: 0,
    down: 2,
  });

  const handleSelectModule = (module) => {
    setSelectedModule(module);
    setNearbyModules({
      up: module - 1,
      down: module + 1,
    });
  };

  useEffect(() => {
    const currentModule = (selectedModule) => {
      if (selectedModule === 3) {
        navigation("/mastersetup");
      } else if (selectedModule === 4) {
        navigation("/dataanalytics");
      } else if (selectedModule === 5) {
        navigation("/usermanagement");
      } else if (selectedModule === 6) {
        navigation("/settings")
      } else if (selectedModule === 7) {
        navigation("/subscription")
      }
      else if (selectedModule === 8) {
        navigation("/requestManagement");
      }  else if (selectedModule === 9) {
        navigation("/profile");
      }
    };

    currentModule(selectedModule);
  }, [selectedModule, navigation]);

  return (
    <>
      <div className="px-[2vw] pt-[1vw] w-screen ">
        <div className=" h-[3.4vw] bg-[#FFFFFF4D] rounded-full w-full shadow-md flex items-center">
          <div className="w-full flex flex-row items-center gap-[2vw] justify-between px-[2vw]">
            <div className="text-[1.5vw] font-extrabold">E-SMART</div>
            <div className="flex gap-[2vw] items-center">
              <button
                className={`text-[1.1vw] cursor-pointer transition-all duration-300 ease-in-out px-[1vw] h-[2.5vw] rounded-full ${
                  selectedModule === 4
                    ? "bg-[#323232] text-white font-semibold"
                    : "bg-transparent text-black"
                }`}
                onClick={() => handleSelectModule(4)}
              >
                DATA ANALYTICS
              </button>
               <button
                className={`text-[1.1vw] cursor-pointer transition-all duration-300 ease-in-out px-[1vw] h-[2.5vw] rounded-full ${
                  selectedModule === 5
                    ? "bg-[#323232] text-white font-semibold"
                    : "bg-transparent text-black"
                }`}
                onClick={() => handleSelectModule(5)}
              >
               USER MANAGEMENT
              </button>
                  <button
                className={`text-[1.1vw] cursor-pointer transition-all duration-300 ease-in-out px-[1vw] h-[2.5vw] rounded-full ${
                  selectedModule === 8
                    ? "bg-[#323232] text-white font-semibold"
                    : "bg-transparent text-black"
                }`}
                onClick={() => handleSelectModule(8)}
              >
               REQUEST MANAGEMENT
              </button>
                <button
                className={`text-[1.1vw] cursor-pointer transition-all duration-300 ease-in-out px-[1vw] h-[2.5vw] rounded-full ${
                  selectedModule === 7
                    ? "bg-[#323232] text-white font-semibold"
                    : "bg-transparent text-black"
                }`}
                onClick={() => handleSelectModule(7)}
              >
               SUBSCRIPTION
              </button>
            </div>
            <div className="flex gap-[1vw]">
              <div onClick={() => handleSelectModule(6)}
              className="bg-white w-[2.5vw] h-[2.5vw] rounded-full flex items-center justify-center hover:shadow-md shadow-slate-400 cursor-pointer transition-shadow duration-200">
                <span>
                  <TbSettingsCog size={"1.5vw"} />
                </span>
              </div>
              <div className="bg-white w-[2.5vw] h-[2.5vw] rounded-full flex items-center justify-center hover:shadow-md shadow-slate-400 cursor-pointer transition-shadow duration-200">
                <span>
                  <IoMdNotificationsOutline size={"1.5vw"} />
                </span>
              </div>
              <div className="bg-[#03246C80] w-[2.5vw] h-[2.5vw] rounded-full flex items-center justify-center hover:shadow-md shadow-slate-400 cursor-pointer transition-shadow duration-200">
                <span>
                  <FaUserCircle color="white" size={"1.5vw"} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
