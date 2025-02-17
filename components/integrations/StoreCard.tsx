import { Integration } from "@/services/queries/integration";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StoreCard = ({
  integrationName,
  integrationDescription,
  integrationImage,
  integrationSlug,
}: Integration) => {
  return (
    <div className="flex rounded-md border border-gray-200 px-4 py-5 w-full gap-4">
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
          <p className="text-foreground-600 leading-tight text-xs maxlines-3 overflow-hidden text-ellipsis">
            {integrationDescription}
          </p>
        </div>
        <Link href={`/integrations/${integrationSlug}`}>
          <Button variant="bordered" radius="sm" className="border-small">
            Explore Integration
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StoreCard;
