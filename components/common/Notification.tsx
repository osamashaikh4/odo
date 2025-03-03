"use client";
import React, { useState } from "react";
import moment from "moment";
import {
  Notification as NotificationT,
  useNotificationsQuery,
  useReadNotificationMutation,
} from "@/services/queries/notification";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import { BsBell } from "react-icons/bs";
import { FiPackage, FiRefreshCw } from "react-icons/fi";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import List from "./List";
import EmptyRecords from "./EmptyRecords";
import NotificationDetailsModal from "../notification/NotificationDetailsModal";

const filters = { limit: 5, offset: 0 };

const Notification = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] =
    useState<NotificationT | null>(null);

  const { data: notifications = [], isLoading } = useNotificationsQuery(
    filters,
    {
      refetchInterval: 15000,
    }
  );

  const readNotification = useReadNotificationMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notifications", filters] });
    },
  });

  const onShowNotification = (n: NotificationT) => {
    if (!n.read) {
      readNotification.mutate({ notificationIDs: [n.notificationID] });
    }
    setIsOpen(false);
    setShowNotification(n);
  };

  return (
    <>
      <Popover
        radius="sm"
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
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
            <List
              items={notifications}
              listEmptyComponent={
                isLoading ? (
                  <div className="flex p-6 w-full justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <EmptyRecords
                    className="p-4"
                    title="You don't have any new notifications."
                    description="When you do they will appear here."
                  />
                )
              }
              renderItem={(notification) => (
                <li
                  key={notification.notificationID}
                  className="border-b border-b-borderGrey px-4 py-3 bg-white hover:bg-backgroundLightGrey cursor-pointer"
                  onClick={() => onShowNotification(notification)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 flex items-start gap-3">
                      <div className="flex rounded-full mt-2 h-6 w-6 justify-center items-center">
                        {notification.notificationText.includes(
                          "sync orders"
                        ) ? (
                          <FiRefreshCw size="1.125rem" />
                        ) : (
                          <FiPackage fontSize="1.5rem" />
                        )}
                      </div>
                      <div>
                        <p className="text-[0.825rem] font-normal">
                          {notification.notificationText}
                        </p>
                        <span className="text-xs font-normal text-foreground-500">
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
              )}
            />
            <li className="px-4 py-3 bg-white hover:bg-backgroundLightGrey cursor-pointer">
              <Link href="/notifications">
                <div className="flex items-center justify-center">
                  <p className="text-sm text-blue">View all notifications</p>
                </div>
              </Link>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
      {showNotification && (
        <NotificationDetailsModal
          notification={showNotification}
          onClose={() => setShowNotification(null)}
        />
      )}
    </>
  );
};

export default Notification;
