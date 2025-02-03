import Image from "next/image";
import React from "react";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="w-[13rem] h-full sticky top-0 z-50 overflow-hidden flex flex-col border-r border-r-gray-200 transition-all duration-300 ease-in-out justify-between"
    >
      <div
        className="h-full bg-white"
        style={{ maxHeight: "calc(-23rem + 100dvh)" }}
      >
        <div className="flex items-center justify-between p-4 h-20">
          <Image
            className="absolute -top-[65px] -left-[31px]"
            src="/assets/images/odo-logo.png"
            alt="odo-logo"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="flex flex-col p-4 z-50 bg-white"></div>
    </div>
  );
}
