"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Image from "next/image";

interface PartnerDetailsProps {
  id: string;
}

const integration = {};

const PartnerDetails = ({ id }: PartnerDetailsProps) => {
  const [loading, setLoading] = useState(false);

  const onConnect = () => {};

  return (
    <div className="h-full">
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 min-h-14 gap-4 -mt-10 mb-7">
        <div className="flex items-center gap-4">
          <Link href="/shipping-partners">
            <MdArrowBack size="1.375rem" />
          </Link>
          <div>
            <p className="text-base">Shipping Partners</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button radius="sm" color="primary" variant="bordered">
            Cancel
          </Button>
          <Button radius="sm" color="primary" onPress={onConnect}>
            Next Step
          </Button>
        </div>
      </div>
      <div className="px-6 pb-6" style={{ height: "calc(100% - 50px)" }}>
        <div className="p-8 rounded border border-gray-200 overflow-auto h-full"></div>
      </div>
    </div>
  );
};

export default PartnerDetails;
