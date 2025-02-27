import React from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { Button } from "@heroui/button";
import { BsPlus } from "react-icons/bs";
import SectionHeader from "@/components/home/SectionHeader";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex h-full">
      <Sidebar active="home" />
      <div className="flex flex-col w-0 flex-1">
        <Header />
        <div className="flex flex-col flex-1 relative overflow-auto">
          <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto">
            <div className="flex relative items-center justify-between py-10 px-8 bg-[#FAFAFA]">
              <SectionHeader />
              <Link href="/shipments">
                <Button
                  radius="sm"
                  startContent={<BsPlus className="h-6 w-6" />}
                  color="primary"
                >
                  Ship Your First Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
