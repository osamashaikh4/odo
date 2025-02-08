import React from "react";

interface StoresHolderCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const StoresHolderCard = ({
  title,
  description,
  children,
}: StoresHolderCardProps) => {
  return (
    <div className="px-3.5">
      <div className="border border-gray-100 p-6 rounded flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">{title}</p>
          <p className="text-sm text-foreground-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default StoresHolderCard;
