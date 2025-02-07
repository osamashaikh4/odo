import React from "react";
import StoresHolderCard from "@/components/integrations/StoresHolderCard";
import IntegrationWrapper from "@/components/integrations/IntegrationWrapper";

export default function page() {
  return (
    <IntegrationWrapper activeTab="connected-stores">
      <StoresHolderCard
        title="Connected integrations"
        description="View all the integrations you’ve already connected to your account for efficient order and inventory management."
      >
        <div className="grid-view"></div>
      </StoresHolderCard>
    </IntegrationWrapper>
  );
}
