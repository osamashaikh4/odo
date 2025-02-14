"use client";
import React from "react";
import Header from "../common/SectionHeader";
import { Button } from "@heroui/react";
import { BsPlus } from "react-icons/bs";

interface SectionHeaderProps {
  onAdd: () => void;
}

const SectionHeader = ({ onAdd }: SectionHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      <Header title="Shipments" icon="shipment" />
      <div>
        <Button
          radius="sm"
          color="primary"
          onPress={onAdd}
          startContent={<BsPlus className="h-6 w-6" />}
        >
          Add Order
        </Button>
      </div>
    </div>
  );
};

export default SectionHeader;
