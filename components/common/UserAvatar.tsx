"use client";
import { useAppStore } from "@/store/appStore";
import { Avatar, Button } from "@heroui/react";
import React from "react";
import Menu from "./Menu";
import { LuCircleUserRound } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import { deleteCookie } from "cookies-next";

const MenuItems = [
  {
    label: "My Profile",
    value: "profile",
    icon: <LuCircleUserRound size="1.25rem" />,
  },
  { label: "Logout", value: "logout", icon: <TbLogout2 size="1.25rem" /> },
];

const UserAvatar = () => {
  const { user, update } = useAppStore();

  const handleActions = (action: string) => {
    if (action === "logout") {
      setTimeout(() => {
        update({ user: undefined });
      }, 1000);
      localStorage.removeItem("odo-access-token");
      localStorage.removeItem("odo-refresh-token");
      deleteCookie("odo-access-token");
      window.location.href = "/";
    }
  };

  return user ? (
    <Menu options={MenuItems} onAction={handleActions} placement="right-end">
      <Button
        radius="sm"
        variant="light"
        className="flex items-center justify-between px-2"
      >
        <div className="flex items-center gap-2">
          <Avatar size="sm" name={`${user?.firstName} ${user?.lastName}`} />
          <p className="font-normal text-sm">
            {user?.firstName} {user?.lastName}
          </p>
        </div>
      </Button>
    </Menu>
  ) : null;
};

export default UserAvatar;
