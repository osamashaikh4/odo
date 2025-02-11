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
        <SectionHeader
          title="Shipping Partners"
          icon="truck"
          iconProps={{ width: 38, height: 38 }}
        />
      </div>
      <div className="px-6">
        <Tabs
          selected="online-stores"
          options={[
            {
              title: "More Connections",
              key: "more-connection",
              href: "/shipping-partners/more-connection",
            },
            {
              title: "Connected",
              key: "connected-partners",
              href: "/shipping-partners/connected-partners",
            },
          ]}
        />
        {children}
      </div>
    </>
  );
}
