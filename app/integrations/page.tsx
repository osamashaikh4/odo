import React from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import SectionHeader from "@/components/common/SectionHeader";
import Tabs from "@/components/common/Tabs";
import Search from "@/components/common/Search";
import { Button } from "@heroui/react";
import Image from "next/image";
import StoreCard from "@/components/integrations/StoreCard";

export default function page() {
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
              <div className="px-3.5">
                <div className="border border-gray-100 p-6 rounded flex flex-col gap-8">
                  <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-2">
                      <p className="text-xl font-bold">
                        Connect your online store
                      </p>
                      <p className="text-sm">
                        Connect your online store to our dashboard for real-time
                        order sync. No more manual data entry—enjoy seamless
                        efficiency!
                      </p>
                    </div>
                    <Search placeholder="Search integrations by name" />
                  </div>
                  <div className="grid-view">
                    <StoreCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
