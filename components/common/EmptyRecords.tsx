import React from "react";

interface EmptyRecordsProps {
  title?: string;
  description?: string;
}

const EmptyRecords = ({ title, description }: EmptyRecordsProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[150px] w-full gap-1">
      <p className="text-base font-semibold">{title || "No records found"}</p>
      <p className="text-sm text-foreground-500">
        {description || `You don't have any records for this page.`}
      </p>
    </div>
  );
};

export default EmptyRecords;
