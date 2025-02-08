import React from "react";
import StoresHolderCard from "@/components/integrations/StoresHolderCard";
import ConnectedStores from "@/components/integrations/ConnectedStores";

export default function page() {
  return (
    <StoresHolderCard
      title="Connected integrations"
      description="View all the integrations you’ve already connected to your account for efficient order and inventory management."
    >
      <ConnectedStores />
    </StoresHolderCard>
  );
}
