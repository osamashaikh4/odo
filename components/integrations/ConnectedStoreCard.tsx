import React from "react";
import moment from "moment";
import { Connection } from "@/services/queries/integration";
import Image from "next/image";
import { Button } from "@heroui/react";
import { LuEllipsis, LuTrash2 } from "react-icons/lu";
import Menu from "../common/Menu";
import { GoSync } from "react-icons/go";

interface ConnectedStoreCardProps extends Connection {
  onAction: (action: string) => void;
}

const Options: any = [
  {
    label: "Sync Orders",
    value: "sync-orders",
    icon: <GoSync fontSize="1rem" />,
  },
  {
    label: "Remove",
    value: "remove",
    icon: <LuTrash2 className="text-danger" fontSize="1rem" />,
    color: "danger",
    className: "text-danger",
  },
];

const ConnectedStoreCard = ({
  storeName,
  integration,
  createdAt,
  onAction,
}: ConnectedStoreCardProps) => {
  return (
    <div className="flex flex-row justify-between items-center gap-10 rounded pl-4 pr-3 pt-4 pb-3 border border-gray-200">
      <div className="flex items-center gap-4">
        <Image
          className="rounded"
          src={integration.integrationImage}
          style={{
            display: "block",
            width: "3.5rem",
            height: "3.5rem",
          }}
          alt={integration.integrationName}
          width={56}
          height={56}
        />
        <div>
          <p className="text-base font-semibold">
            {integration.integrationName}
          </p>
          {storeName && (
            <p className="text-sm">
              <span className="text-foreground-500">Store Name:</span>{" "}
              {storeName}
            </p>
          )}
          <p className="text-xs text-foreground-500">
            added {moment(createdAt).fromNow()}
          </p>
        </div>
      </div>
      <Menu onAction={onAction} options={Options}>
        <Button isIconOnly variant="light">
          <LuEllipsis fontSize="1.25rem" />
        </Button>
      </Menu>
    </div>
  );
};

export default ConnectedStoreCard;
