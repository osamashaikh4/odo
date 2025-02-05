import React from "react";
import StoreCard from "@/components/integrations/StoreCard";
import StoresHolderCard from "@/components/integrations/StoresHolderCard";

export default function page() {
  return (
    <StoresHolderCard
      title="Connect your online store"
      description="Connect your online store to our dashboard for real-time order
              sync. No more manual data entry—enjoy seamless efficiency!"
    >
      <div className="grid-view">
        <StoreCard />
      </div>
    </StoresHolderCard>
  );
}
