"use client";
import React from "react";
import moment from "moment";
import { useNotificationsQuery } from "@/services/queries/notification";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { BsBell } from "react-icons/bs";
import { FiPackage, FiRefreshCw } from "react-icons/fi";

const Notification = () => {
  const { data: notifications } = useNotificationsQuery({
    refetchInterval: 15000,
  });
  console.log(notifications);
  return (
    <Popover radius="sm">
      <PopoverTrigger>
        <Button isIconOnly radius="sm" variant="light">
          <BsBell fontSize="1.25rem" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 shadow-containerShadow max-w-[358px] overflow-auto max-h-[90dvh]">
        <div className="w-full px-4 pt-4 pb-1">
          <p className="text-sm font-medium">Notifications</p>
        </div>
        <ul>
          {notifications?.map((notification) => (
            <li
              key={notification.notificationID}
              className="border-b border-b-borderGrey px-4 py-3 bg-white hover:bg-backgroundLightGrey cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex rounded-full mt-2 h-6 w-6 justify-center items-center">
                    {notification.notificationText.includes("sync orders") ? (
                      <FiRefreshCw size="1.125rem" />
                    ) : (
                      <FiPackage fontSize="1.5rem" />
                    )}
                  </div>
                  <div>
                    <p className="text-[0.825rem] font-normal">
                      {notification.notificationText}
                    </p>
                    <span className="text-xs font-normal text-foreground-600">
                      {moment(notification.createdAt).format(
                        "DD/MM/YYYY HH:MM"
                      )}
                    </span>
                  </div>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                )}
              </div>
            </li>
          ))}
          <li className="px-4 py-3 bg-white hover:bg-backgroundLightGrey cursor-pointer">
            <div className="flex items-center justify-center">
              <p className="text-sm text-blue">View all notifications</p>
            </div>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
