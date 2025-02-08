"use client";
import React, { useState } from "react";
import {
  Connection,
  useConnectionsQuery,
  useRemoveConnectionMutation,
} from "@/services/queries/integration";
import { Spinner } from "@heroui/react";
import ConnectedStoreCard from "./ConnectedStoreCard";
import AlertModal from "../common/AlertModal";
import { useQueryClient } from "@tanstack/react-query";

const ConnectedStores = () => {
  const queryClient = useQueryClient();
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
    if (action === "remove") {
      if (data) setAlert(data);
    } else if (action === "confirm-remove") {
      if (alert) {
        removeConnection.mutate(alert.connectionID);
      }
    }
  };

  return isFetching ? (
    <Spinner size="lg" />
  ) : (
    <>
      <div className="flex flex-col gap-10">
        {connections.map((connection) => (
          <ConnectedStoreCard
            {...connection}
            key={connection.connectionID}
            onAction={(a) => onAction(a, connection)}
          />
        ))}
      </div>
      {alert && (
        <AlertModal
          title="Remove Integration"
          content={
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold">
                Are you sure you want to remove the connection with{" "}
                {alert.integration.integrationName}?
              </p>
              <p className="text-[0.8rem] text-default-600">
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
  );
};

export default ConnectedStores;
