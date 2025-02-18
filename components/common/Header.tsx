import React from "react";
import Notification from "./Notification";

export default function Header() {
  return (
    <header className="bg-white border-b border-borderDarkGrey flex px-6 sticky z-50 top-0 flex-row items-center justify-between h-14">
      <div></div>
      <div>
        <Notification />
      </div>
    </header>
  );
}
