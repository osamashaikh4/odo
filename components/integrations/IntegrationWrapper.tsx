import React from "react";
import SectionHeader from "../common/SectionHeader";
import Tabs from "../common/Tabs";

interface WrapperProps {
  activeTab?: string;
  children: React.ReactNode;
}

const IntegrationWrapper = ({
  activeTab = "online-stores",
  children,
}: WrapperProps) => {
  return (
    <>
      <div className="px-10">
        <SectionHeader title="Integrations" icon="apps" />
      </div>
      <div className="px-6">
        <Tabs
          selected={activeTab}
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
};

export default IntegrationWrapper;
