import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import Tabs from "@/components/common/Tabs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}
