"use client";
import React from "react";
import {
  Tabs as HeroTabs,
  Tab as HeroTab,
  TabsProps as HeroTabProps,
} from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

interface TabsProps extends HeroTabProps {
  selected: string;
  options: { title: string; key: string; href: string }[];
}

const Tabs = ({ options, selected, onSelectionChange }: TabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <HeroTabs
      classNames={{ tabList: "pb-0" }}
      variant="underlined"
      onSelectionChange={(k: any) => {
        if (onSelectionChange) {
          onSelectionChange(k);
        } else {
          router.push(options.find((o) => o.key === k)?.href ?? k);
        }
      }}
      selectedKey={options.find((o) => o.href === pathname)?.key ?? selected}
    >
      {options.map((o) => (
        <HeroTab className="text-[0.925rem]" key={o.key} title={o.title} />
      ))}
    </HeroTabs>
  );
};

export default Tabs;
