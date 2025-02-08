import React from "react";

const EmptyRecords = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[150px] w-full gap-1">
      <p className="text-base font-semibold">No records found</p>
      <p className="text-sm text-default-600">
        You don't have any records for this page.
      </p>
    </div>
  );
};

export default EmptyRecords;
