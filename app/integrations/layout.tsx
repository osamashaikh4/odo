import React from "react";
import Header from "@/components/common/Header";
import SectionHeader from "@/components/common/SectionHeader";
import Sidebar from "@/components/common/Sidebar";
import Tabs from "@/components/common/Tabs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full">
      <Sidebar active="integrations" />
      <div className="flex flex-col w-0 flex-1">
        <Header />
        <div className="flex flex-col flex-1 relative overflow-auto">
          <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto py-10 bg-backgroundGrey">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
