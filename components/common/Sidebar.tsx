import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/helpers";
import { Avatar, Button } from "@heroui/react";
import UserAvatar from "./UserAvatar";

interface SidebarProps {
  active: string;
}

const SidebarItems = [
  {
    label: "Home",
    value: "home",
    icon: (
      <Image src="/assets/icons/home.svg" alt="home" width={24} height={24} />
    ),
  },
  {
    label: "Shipments",
    value: "shipments",
    icon: (
      <Image
        src="/assets/icons/shipment.svg"
        alt="shipment"
        width={25}
        height={25}
      />
    ),
  },
  {
    label: "Integrations",
    value: "integrations",
    icon: (
      <Image src="/assets/icons/apps.svg" alt="apps" width={26} height={26} />
    ),
  },
  {
    label: "Shipping Partners",
    value: "shipping-partners",
    icon: (
      <Image src="/assets/icons/truck.svg" alt="truck" width={30} height={30} />
    ),
  },
  {
    label: "Pickup Location",
    value: "pickup-location",
    icon: (
      <Image
        src="/assets/icons/location.svg"
        alt="location"
        width={24}
        height={24}
      />
    ),
  },
];

const Sidebar = ({ active }: SidebarProps) => {
  return (
    <div
      id="sidebar"
      className="w-[220px] h-full sticky top-0 z-50 overflow-hidden flex flex-col border-r border-r-gray-200 transition-all duration-300 ease-in-out justify-between"
    >
      <div
        className="h-full bg-white"
        style={{ maxHeight: "calc(-23rem + 100dvh)" }}
      >
        <div className="flex items-center justify-between p-4 h-16 relative overflow-hidden">
          <Image
            className="absolute -top-[73px] -left-[34px]"
            src="/assets/images/odo-logo.png"
            alt="odo-logo"
            width={500}
            height={500}
          />
        </div>
        <div className="relative flex-1 flex flex-col min-h-0 bg-white pt-0">
          <div className="flex-1 px-2 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              <li></li>
              {SidebarItems.map((sidebarItem) => (
                <li key={sidebarItem.value}>
                  <Link
                    href={`/${sidebarItem.value}`}
                    className={cn(
                      "text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group",
                      active === sidebarItem.value ? "bg-gray-100" : ""
                    )}
                  >
                    {sidebarItem.icon}
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      {sidebarItem.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 px-2 z-50 bg-white">
        <UserAvatar />
      </div>
    </div>
  );
};

export default Sidebar;
