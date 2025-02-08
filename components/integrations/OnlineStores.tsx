"use client";
import React, { useState } from "react";
import StoreCard from "./StoreCard";
import { useIntegrationsQuery } from "@/services/queries/integration";
import { Spinner } from "@heroui/react";
import Search from "../common/Search";
import useDebounce from "@/hooks/useDebounce";
import List from "../common/List";
import EmptyRecords from "../common/EmptyRecords";

const OnlineStores = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce<string>(query, 500);

  const { data = { results: [] }, isFetching } = useIntegrationsQuery({
    refetchOnMount: true,
  });
  return (
    <>
      <Search
        placeholder="Search integrations by name"
        onChange={(e) => setQuery(e.target.value)}
      />
      {isFetching ? (
        <Spinner size="lg" />
      ) : (
        <div className="grid-view">
          <List
            items={data.results.filter((result) =>
              result.integrationName
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase())
            )}
            listEmptyComponent={
              <div style={{ width: "calc(100vw - 348px)" }}>
                <EmptyRecords />
              </div>
            }
            renderItem={(result) => (
              <StoreCard {...result} key={result.integrationID} />
            )}
          />
        </div>
      )}
    </>
  );
};

export default OnlineStores;
