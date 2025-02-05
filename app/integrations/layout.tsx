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
          <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto py-10">
            <div className="px-10">
              <SectionHeader title="Integrations" icon="apps" />
            </div>
            <div className="px-6">
              <Tabs
                selected="online-stores"
                options={[
                  {
                    title: "All Integrations",
                    key: "online-stores",
                    href: "/integrations/online-stores",
                  },
                  {
                    title: "Connected Integrations",
                    key: "connected-stores",
                    href: "/integrations/connected-stores",
                  },
                ]}
              />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
