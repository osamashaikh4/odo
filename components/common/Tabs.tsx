"use client";
import React from "react";
import { Tabs as HeroTabs, Tab as HeroTab } from "@heroui/react";
import { useRouter } from "next/navigation";

interface TabsProps {
  selected: string;
  options: { title: string; key: string; href: string }[];
}

const Tabs = ({ options, selected }: TabsProps) => {
  const router = useRouter();
  return (
    <HeroTabs
      classNames={{ tabList: "pb-0" }}
      variant="underlined"
      onSelectionChange={(k: any) =>
        router.push(options.find((o) => o.key === k)?.href ?? k)
      }
      selectedKey={selected}
    >
      {options.map((o) => (
        <HeroTab className="text-sm" key={o.key} title={o.title} />
      ))}
    </HeroTabs>
  );
};

export default Tabs;
