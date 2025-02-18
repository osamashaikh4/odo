"use client";
import React, { useState } from "react";
import moment from "moment";
import {
  Notification,
  useNotificationsQuery,
  useReadNotificationMutation,
} from "@/services/queries/notification";
import { FiPackage, FiRefreshCw } from "react-icons/fi";
import { Button, Spinner } from "@heroui/react";
import SectionHeader from "../shipments/SectionHeader";
import { BsCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import FormSelect from "../common/FormSelect";
import List from "../common/List";
import EmptyRecords from "../common/EmptyRecords";
import NotificationDetailsModal from "./NotificationDetailsModal";
import { useQueryClient } from "@tanstack/react-query";

const DateOptions = [
  {
    label: "Today",
    value: "today",
    range: {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
  },
  {
    label: "Last 7 days",
    value: "7",
    range: {
      startDate: moment().subtract(6, "day").format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
  },
  {
    label: "Last 14 days",
    value: "14",
    range: {
      startDate: moment().subtract(13, "day").format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
  },
  {
    label: "Last 30 days",
    value: "30",
    range: {
      startDate: moment().subtract(29, "day").format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
  },
];

const DateOptionsMap = DateOptions.reduce((acc: any, curr) => {
  acc[curr.value] = { ...curr };
  return acc;
}, {});

const NotificationList = () => {
  const queryClient = useQueryClient();
  const [mutate, setMutate] = useState(false);
  const [showNotification, setShowNotification] = useState<Notification | null>(
    null
  );

  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
    ...DateOptionsMap["7"].range,
  });

  const { data: notifications = [], isFetching } = useNotificationsQuery(
    filters,
    {
      refetchOnMount: true,
    }
  );

  const readNotification = useReadNotificationMutation({
    onSuccess() {
      setMutate(true);
      queryClient.invalidateQueries({ queryKey: ["notifications", filters] });
    },
  });

  const onShowNotification = (n: Notification) => {
    if (!n.read) {
      readNotification.mutate({ notificationIDs: [n.notificationID] });
    }
    setShowNotification(n);
  };

  return (
    <>
      <SectionHeader
        title="Notifications"
        rightAction={
          notifications.some((notification) => !notification.read) ? (
            <Button
              color="primary"
              variant="light"
              radius="sm"
              onPress={() => {
                readNotification.mutate({
                  notificationIDs: ["all"],
                });
              }}
              startContent={
                <BsCheckCircleFill fontSize="0.875rem" className="text-blue" />
              }
            >
              Mark All As Read
            </Button>
          ) : (
            <></>
          )
        }
      />
      <div className="max-h-[90dvh] overflow-auto border border-borderDarkGrey p-6 rounded flex flex-col gap-3 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex-1 max-w-[272px]">
            <FormSelect
              options={DateOptions}
              defaultSelectedKeys={["7"]}
              onChange={(e) => {
                setMutate(false);
                const v = e.target.value;
                setFilters({ ...filters, ...DateOptionsMap[v].range });
              }}
            />
          </div>
        </div>
        <ul>
          <List
            items={notifications}
            listEmptyComponent={
              mutate ? null : isFetching ? (
                <div className="flex p-6 w-full justify-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                <EmptyRecords
                  title="You don't have any new notifications in this date period."
                  description="You can select other date periods to see older notifications."
                />
              )
            }
            renderItem={(notification) => (
              <li
                key={notification.notificationID}
                className="border-b border-b-borderGrey px-2 py-3 bg-white hover:bg-backgroundLightGrey cursor-pointer"
                onClick={() => onShowNotification(notification)}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 flex items-start gap-3">
                    <div className="flex rounded-full mt-2 h-6 w-6 justify-center items-center">
                      {notification.notificationText.includes("sync orders") ? (
                        <FiRefreshCw size="1.25rem" />
                      ) : (
                        <FiPackage fontSize="1.5rem" />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="text-sm font-semibold">
                          {notification.notificationTitle}
                        </p>
                        <p className="text-sm font-normal">
                          {notification.notificationText}
                        </p>
                      </div>
                      <span className="text-xs font-normal text-foreground-500">
                        {moment(notification.createdAt).format(
                          "DD/MM/YYYY HH:MM"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    )}
                    {notification.link && (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}${notification.link}`}
                      >
                        <Button color="primary" variant="light" radius="sm">
                          Download
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            )}
          />
        </ul>
      </div>
      {showNotification && (
        <NotificationDetailsModal
          notification={showNotification}
          onClose={() => setShowNotification(null)}
        />
      )}
    </>
  );
};

export default NotificationList;
