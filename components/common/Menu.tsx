"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  MenuItemProps,
  DropdownProps,
} from "@heroui/react";
import React from "react";

interface MenuProps {
  placement?: DropdownProps["placement"];
  options: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    color?: MenuItemProps["color"];
    className?: string;
  }[];
  children: React.ReactNode;
  onAction: (key: any) => void;
}

const Menu = ({
  options,
  children,
  onAction,
  placement = "bottom-end",
}: MenuProps) => {
  return (
    <Dropdown placement={placement}>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu variant="flat" onAction={onAction}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            color={option.color}
            className={option.className}
            startContent={option.icon}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Menu;
