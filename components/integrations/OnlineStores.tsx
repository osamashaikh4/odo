"use client";
import React from "react";
import StoreCard from "./StoreCard";
import { useIntegrationsQuery } from "@/services/queries/integration";

const OnlineStores = () => {
  const { data = { results: [] } } = useIntegrationsQuery({
    refetchOnMount: true,
  });

  return (
    <div className="grid-view">
      {data.results.map((result) => (
        <StoreCard {...result} key={result.integrationID} />
      ))}
    </div>
  );
};

export default OnlineStores;
