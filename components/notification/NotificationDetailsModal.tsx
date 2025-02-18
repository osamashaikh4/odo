import React from "react";
import BaseModal from "../common/BaseModal";
import { Notification } from "@/services/queries/notification";
import moment from "moment";
import { Button } from "@heroui/react";

interface NotificationDetailsModalProps {
  notification: Notification;
  onClose: () => void;
}

const NotificationDetailsModal = ({
  notification,
  onClose,
}: NotificationDetailsModalProps) => {
  return (
    <BaseModal
      closeButtonProps={{ fontSize: "2.25rem" }}
      className="max-h-[calc(100%_-_4rem)] max-w-[43rem]"
      onClose={onClose}
      header={
        <div className="flex-col flex gap-2">
          {notification.notificationTitle}{" "}
          <span className="text-xs font-normal">
            {moment(notification.createdAt).format("DD/MM/YYYY HH:MM")}
          </span>
        </div>
      }
      content={
        <div className="px-4 pt-2 pb-4">
          <p className="text-sm">{notification.notificationText}</p>
        </div>
      }
      footer={
        <div>
          <Button
            radius="sm"
            variant="bordered"
            color="primary"
            className="border-small"
          >
            Close
          </Button>
        </div>
      }
    />
  );
};

export default NotificationDetailsModal;
