import React from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import PickupLocation from "@/components/pickup-location/PickupLocation";

export default function page() {
  return (
    <div className="flex h-full">
      <Sidebar active="pickup-location" />
      <div className="flex flex-col w-0 flex-1">
        <Header />
        <div className="flex flex-col flex-1 relative overflow-auto bg-backgroundGrey">
          <PickupLocation />
        </div>
      </div>
    </div>
  );
}
