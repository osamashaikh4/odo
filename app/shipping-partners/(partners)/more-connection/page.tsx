import StoresHolderCard from "@/components/integrations/StoresHolderCard";
import MoreConnections from "@/components/shipping-partners/MoreConnections";
import React from "react";

export default function page() {
  return (
    <StoresHolderCard
      title="Connect your shipping partners"
      description="Unlock a World of Shipping Possibilities. Seamlessly Integrate with your preferred shipping partner from local and global delivery companies."
    >
      <MoreConnections />
    </StoresHolderCard>
  );
}
