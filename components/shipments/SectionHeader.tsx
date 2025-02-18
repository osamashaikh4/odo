"use client";
import React from "react";
import Header from "../common/SectionHeader";
import { Button } from "@heroui/react";
import { BsPlus } from "react-icons/bs";

interface SectionHeaderProps {
  title: string;
  icon?: string;
  rightAction?: React.ReactNode;
  onAdd?: () => void;
}

const SectionHeader = ({
  title,
  icon,
  rightAction,
  onAdd,
}: SectionHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between mb-8">
      <Header title={title} icon={icon} className="mb-0" />
      <div>
        {rightAction ? (
          rightAction
        ) : (
          <Button
            radius="sm"
            color="primary"
            onPress={onAdd}
            startContent={<BsPlus className="h-6 w-6" />}
          >
            Add Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
