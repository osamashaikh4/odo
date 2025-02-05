"use client";
import { useAppStore } from "@/store/appStore";
import React from "react";

const SectionHeader = () => {
  const { user } = useAppStore();
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-4xl font-bold">Welcome, {user?.firstName}</h2>
      <p className="text-lg">Let's create your first shipment together!</p>
    </div>
  );
};

export default SectionHeader;
