"use client";
import React from "react";
import Header from "../common/SectionHeader";

interface SectionHeaderProps {
  title: string;
  icon?: string;
  rightAction?: React.ReactNode;
}

const SectionHeader = ({ title, icon, rightAction }: SectionHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between mb-8">
      <Header title={title} icon={icon} className="mb-0" />
      <div>{rightAction}</div>
    </div>
  );
};

export default SectionHeader;
