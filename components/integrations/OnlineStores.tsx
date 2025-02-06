"use client";
import React from "react";
import StoreCard from "./StoreCard";
import { useIntegrationsQuery } from "@/services/queries/integration";

const OnlineStores = () => {
  const { data: integrations = [] } = useIntegrationsQuery({
    refetchOnMount: true,
  });

  return (
    <div className="grid-view">
      {integrations.map((integration) => (
        <StoreCard {...integration} key={integration.integrationID} />
      ))}
    </div>
  );
};

export default OnlineStores;
