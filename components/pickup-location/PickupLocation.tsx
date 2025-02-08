"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import "react-phone-number-input/style.css";
import { useWarehouseQuery } from "@/services/queries/warehouse";
import PickupForm from "./PickupForm";

const PickupLocation = () => {
  const { data: warehouse, isLoading } = useWarehouseQuery();

  return (
    <div className="p-10 flex flex-col h-full overflow-x-auto overflow-y-hidden">
      {isLoading ? <Spinner size="lg" /> : <PickupForm warehouse={warehouse} />}
    </div>
  );
};

export default PickupLocation;
