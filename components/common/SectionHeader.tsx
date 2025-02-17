import React from "react";
import Image from "next/image";
import { cn } from "@/helpers";

interface SectionHeaderProps {
  icon: string;
  title: string;
  className?: string;
  iconProps?: { width?: number; height?: number };
}

const SectionHeader = ({
  icon,
  title,
  iconProps,
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-between relative mb-8 gap-4",
        className
      )}
    >
      <div className="flex items-center w-full h-full flex-1 gap-4">
        <Image
          width={32}
          height={32}
          {...iconProps}
          src={`/assets/icons/${icon}.svg`}
          alt={icon}
        />
        <p className="text-3xl font-bold">{title}</p>
      </div>
    </div>
  );
};

export default SectionHeader;
