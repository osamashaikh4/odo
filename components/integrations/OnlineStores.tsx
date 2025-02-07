"use client";
import React from "react";
import StoreCard from "./StoreCard";
import { useIntegrationsQuery } from "@/services/queries/integration";
import { Spinner } from "@heroui/react";

const OnlineStores = () => {
  const { data = { results: [] }, isFetching } = useIntegrationsQuery({
    refetchOnMount: true,
  });

  return isFetching ? (
    <Spinner size="lg" />
  ) : (
    <div className="grid-view">
      {data.results.map((result) => (
        <StoreCard {...result} key={result.integrationID} />
      ))}
    </div>
  );
};

export default OnlineStores;
