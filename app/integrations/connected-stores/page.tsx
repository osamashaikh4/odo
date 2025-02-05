import React from "react";
import StoresHolderCard from "@/components/integrations/StoresHolderCard";

export default function page() {
  return (
    <StoresHolderCard
      title="Connected integrations"
      description="View all the integrations you’ve already connected to your account for efficient order and inventory management."
    >
      <div className="grid-view"></div>
    </StoresHolderCard>
  );
}
