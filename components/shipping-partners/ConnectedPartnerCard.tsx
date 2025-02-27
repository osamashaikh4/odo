import React from "react";
import moment from "moment";
import Image from "next/image";
import { Button } from "@heroui/react";
import { LuEllipsis, LuTrash2 } from "react-icons/lu";
import Menu from "../common/Menu";
import { ShippingPartner } from "@/services/queries/shipping-partner";
import { BiEditAlt } from "react-icons/bi";

interface ConnectedPartnerCardProps extends ShippingPartner {
  onAction: (action: string) => void;
}

const Options: any = [
  {
    label: "Edit",
    value: "edit",
    icon: <BiEditAlt fontSize="1rem" />,
  },
  {
    label: "Delete",
    value: "delete",
    icon: <LuTrash2 className="text-danger" fontSize="1rem" />,
    color: "danger",
    className: "text-danger",
  },
];

const ConnectedPartnerCard = ({
  shippingPartnerName,
  shippingPartnerLogo,
  shippingPartnerConnection,
  onAction,
}: ConnectedPartnerCardProps) => {
  return (
    <div className="flex flex-row justify-between items-center gap-10 rounded pl-4 pr-3 pt-4 pb-3 border border-gray-200">
      <div className="flex items-center gap-4">
        <Image
          className="rounded"
          src={shippingPartnerLogo}
          style={{
            display: "block",
            width: "3.5rem",
            height: "3.5rem",
          }}
          alt={shippingPartnerName}
          width={56}
          height={56}
        />
        <div>
          <p className="text-base font-semibold">{shippingPartnerName}</p>
          {/* {storeName && (
            <p className="text-sm">
              <span className="text-foreground-500">Store Name:</span>{" "}
              {storeName}
            </p>
          )} */}
          <p className="text-xs text-foreground-500">
            added {moment(shippingPartnerConnection?.createdAt ?? "").fromNow()}
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

export default ConnectedPartnerCard;
