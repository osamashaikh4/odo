"use client";
import React, { useState } from "react";
import { Spinner } from "@heroui/react";
import AlertModal from "../common/AlertModal";
import { useQueryClient } from "@tanstack/react-query";
import Search from "../common/Search";
import useDebounce from "@/hooks/useDebounce";
import EmptyRecords from "../common/EmptyRecords";
import List from "../common/List";
import {
  ShippingPartner,
  useConnectedShippingPartnersQuery,
  useRemoveShippingPartnerConnectionMutation,
} from "@/services/queries/shipping-partner";
import ConnectedPartnerCard from "./ConnectedPartnerCard";
import { useRouter } from "next/navigation";

const ConnectedPartners = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce<string>(query, 500);
  const [alert, setAlert] = useState<ShippingPartner | null>(null);

  const { data: connectedShippingPartners = [], isFetching } =
    useConnectedShippingPartnersQuery();

  const removeConnection = useRemoveShippingPartnerConnectionMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["connected-shipping-partners"],
      });
      setAlert(null);
    },
  });

  const onAction = (action: string, data?: ShippingPartner) => {
    if (action === "edit") {
      router.push(
        `/shipping-partners/${data?.shippingPartnerSlug}?connectionID=${data?.shippingPartnerConnection?.shippingPartnerConnectionID}`
      );
    } else if (action === "delete") {
      if (data) setAlert(data);
    } else if (action === "confirm-delete") {
      if (alert) {
        removeConnection.mutate(
          alert.shippingPartnerConnection?.shippingPartnerConnectionID ?? ""
        );
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
              items={connectedShippingPartners.filter(
                (connectedShippingPartner) =>
                  connectedShippingPartner.shippingPartnerName
                    .toLowerCase()
                    .includes(debouncedQuery.toLowerCase())
              )}
              listEmptyComponent={<EmptyRecords />}
              renderItem={(connectedShippingPartner) => (
                <ConnectedPartnerCard
                  {...connectedShippingPartner}
                  key={connectedShippingPartner.shippingPartnerID}
                  onAction={(a) => onAction(a, connectedShippingPartner)}
                />
              )}
            />
          </div>
          {alert && (
            <AlertModal
              title="Remove Shipping Partner"
              content={
                <div className="flex flex-col gap-2">
                  <p className="text-base font-semibold">
                    Are you sure you want to remove the connection with{" "}
                    {alert.shippingPartnerName}?
                  </p>
                  <p className="text-[0.8rem] text-foreground-500">
                    Removing the shipping partner connection will delete its
                    credentials, requiring you to reconnect from the beginning.
                  </p>
                </div>
              }
              primaryButtonText="Remove Shipping Partner"
              isLoading={removeConnection.isPending}
              onAction={() => onAction("confirm-delete")}
              onClose={() => setAlert(null)}
            />
          )}
        </>
      )}
    </>
  );
};

export default ConnectedPartners;
