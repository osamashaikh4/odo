import { cn } from "@/helpers";
import React from "react";

interface EmptyRecordsProps {
  title?: string;
  description?: string;
  className?: string;
}

const EmptyRecords = ({ title, description, className }: EmptyRecordsProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[150px] w-full gap-1",
        className
      )}
    >
      <p className="text-base font-semibold">{title || "No records found"}</p>
      <p className="text-sm text-foreground-500">
        {description || `You don't have any records for this page.`}
      </p>
    </div>
  );
};

export default EmptyRecords;
