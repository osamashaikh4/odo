import React from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";

export default function page() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-0 flex-1">
        <Header />
        <div></div>
      </div>
    </div>
  );
}
