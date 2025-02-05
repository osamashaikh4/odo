import React from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import SectionHeader from "@/components/common/SectionHeader";

export default function page() {
  return (
    <div className="flex h-full">
      <Sidebar active="shipping-partners" />
      <div className="flex flex-col w-0 flex-1">
        <Header />
        <div className="flex flex-col flex-1 relative overflow-auto">
          <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto p-10">
            <SectionHeader
              title="Shipping Partners"
              icon="truck"
              iconProps={{ width: 38, height: 38 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
