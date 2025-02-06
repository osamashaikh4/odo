import React from "react";
import StoresHolderCard from "@/components/integrations/StoresHolderCard";
import OnlineStores from "@/components/integrations/OnlineStores";

export default function page() {
  return (
    <StoresHolderCard
      title="Connect your online store"
      description="Connect your online store to our dashboard for real-time order
              sync. No more manual data entry—enjoy seamless efficiency!"
    >
      <OnlineStores />
    </StoresHolderCard>
  );
}
