"use client";
import React, { useState } from "react";
import {
  Connection,
  Integration,
  useConnectionsQuery,
  useRemoveConnectionMutation,
} from "@/services/queries/integration";
import { Spinner } from "@heroui/react";
import ConnectedStoreCard from "./ConnectedStoreCard";
import AlertModal from "../common/AlertModal";
import { useQueryClient } from "@tanstack/react-query";
import Search from "../common/Search";
import useDebounce from "@/hooks/useDebounce";
import EmptyRecords from "../common/EmptyRecords";
import List from "../common/List";
import SyncOrdersModal from "./SyncOrdersModal";

const ConnectedStores = () => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce<string>(query, 500);
  const [syncOrdersModal, setSyncOrdersModal] = useState<Integration | null>(
    null
  );
  const [alert, setAlert] = useState<Connection | null>(null);
  const { data: connections = [], isFetching } = useConnectionsQuery();

  const removeConnection = useRemoveConnectionMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["connections"],
      });
      setAlert(null);
    },
  });

  const onAction = (action: string, data?: Connection) => {
    if (action === "sync-orders") {
      if (data?.integration) setSyncOrdersModal(data?.integration);
    } else if (action === "remove") {
      if (data) setAlert(data);
    } else if (action === "confirm-remove") {
      if (alert) {
        removeConnection.mutate(alert.connectionID);
      }
    }
  };

  return (
    <>
      <Search
        placeholder="Search integrations by name"
        onChange={(e) => setQuery(e.target.value)}
      />
      {isFetching ? (
        <Spinner size="lg" />
      ) : (
        <>
          <div className="flex flex-col gap-10">
            <List
              items={connections.filter((connection) =>
                connection.integration.integrationName
                  .toLowerCase()
                  .includes(debouncedQuery.toLowerCase())
              )}
              listEmptyComponent={<EmptyRecords />}
              renderItem={(connection) => (
                <ConnectedStoreCard
                  {...connection}
                  key={connection.connectionID}
                  onAction={(a) => onAction(a, connection)}
                />
              )}
            />
          </div>
          {syncOrdersModal && (
            <SyncOrdersModal
              integration={syncOrdersModal}
              onClose={() => setSyncOrdersModal(null)}
            />
          )}
          {alert && (
            <AlertModal
              title="Remove Integration"
              content={
                <div className="flex flex-col gap-2">
                  <p className="text-base font-semibold">
                    Are you sure you want to remove the connection with{" "}
                    {alert.integration.integrationName}?
                  </p>
                  <p className="text-[0.8rem] text-foreground-500">
                    Removing the store's connection will delete its credentials,
                    requiring you to reconnect from the beginning.
                  </p>
                </div>
              }
              isLoading={removeConnection.isPending}
              onAction={() => onAction("confirm-remove")}
              onClose={() => setAlert(null)}
            />
          )}
        </>
      )}
    </>
  );
};

export default ConnectedStores;
