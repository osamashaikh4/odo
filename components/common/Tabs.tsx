"use client";
import React from "react";
import { Tabs as HeroTabs, Tab as HeroTab } from "@heroui/react";

interface TabsProps {
  selected: string;
  options: { title: string; key: string; href: string }[];
}

const Tabs = ({ options, selected }: TabsProps) => {
  return (
    <HeroTabs
      classNames={{ tabList: "pb-0" }}
      variant="underlined"
      selectedKey={selected}
    >
      {options.map((o) => (
        <HeroTab
          className="text-base"
          key={o.key}
          title={o.title}
          href={o.href}
        />
      ))}
    </HeroTabs>
  );
};

export default Tabs;
