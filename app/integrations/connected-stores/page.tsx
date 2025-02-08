import React from "react";
import StoresHolderCard from "@/components/integrations/StoresHolderCard";
import IntegrationWrapper from "@/components/integrations/IntegrationWrapper";
import ConnectedStores from "@/components/integrations/ConnectedStores";

export default function page() {
  return (
    <IntegrationWrapper activeTab="connected-stores">
      <StoresHolderCard
        title="Connected integrations"
        description="View all the integrations you’ve already connected to your account for efficient order and inventory management."
      >
        <ConnectedStores />
      </StoresHolderCard>
    </IntegrationWrapper>
  );
}
