import React from "react";
import StoresHolderCard from "@/components/integrations/StoresHolderCard";
import ConnectedPartners from "@/components/shipping-partners/ConnectedPartners";

export default function page() {
  return (
    <StoresHolderCard
      title="Connected Shipping Partners"
      description="This part includes all shipping companies which you have a integration with."
    >
      <ConnectedPartners />
    </StoresHolderCard>
  );
}
