import React from "react";
import Image from "next/image";

interface SectionHeaderProps {
  icon: string;
  title: string;
  iconProps?: { width?: number; height?: number };
}

const SectionHeader = ({ icon, title, iconProps }: SectionHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between relative mb-10 gap-4">
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
