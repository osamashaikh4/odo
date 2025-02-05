"use client";
import React from "react";
import { Tabs as HeroTabs, Tab as HeroTab } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

interface TabsProps {
  selected: string;
  options: { title: string; key: string; href: string }[];
}

const Tabs = ({ options, selected }: TabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <HeroTabs
      classNames={{ tabList: "pb-0" }}
      variant="underlined"
      onSelectionChange={(k: any) => router.push(k)}
      selectedKey={options.find((o) => o.href === pathname)?.key ?? selected}
    >
      {options.map((o) => (
        <HeroTab className="text-base" key={o.key} title={o.title} />
      ))}
    </HeroTabs>
  );
};

export default Tabs;
