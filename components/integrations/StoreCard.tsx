import { Integration } from "@/services/queries/integration";
import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
// "https://storage.googleapis.com/tryoto-public/sales-channels-logo/salla.png";
const StoreCard = ({
  integrationName,
  integrationDescription,
  integrationImage,
}: Integration) => {
  return (
    <div className="flex rounded-md border border-gray-100 px-4 py-5 w-full gap-4">
      <Image
        className="rounded"
        src={integrationImage}
        style={{
          display: "block",
          width: "3rem",
          height: "3rem",
        }}
        alt={integrationName}
        width={41}
        height={41}
      />
      <div className="flex flex-col flex-1 gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold">{integrationName}</p>
          <p className="leading-tight text-xs maxlines-3 overflow-hidden text-ellipsis">
            {integrationDescription}
          </p>
        </div>
        <Button variant="bordered" radius="sm">
          Explore Integration
        </Button>
      </div>
    </div>
  );
};

export default StoreCard;
