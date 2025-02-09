import React from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import SectionHeader from "@/components/common/SectionHeader";
import OrderList from "@/components/order/OrderList";

export default function page() {
  return (
    <div className="flex h-full">
      <Sidebar active="shipments" />
      <div className="flex flex-col w-0 flex-1">
        <Header />
        <div className="flex flex-col flex-1 relative overflow-auto">
          <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto p-10">
            <SectionHeader title="Shipments" icon="shipment" />
            <OrderList />
          </div>
        </div>
      </div>
    </div>
  );
}
