"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Image from "next/image";
import {
  useAuthorizeIntegrationMutation,
  useIntegrationQuery,
  useSaveIntegrationMutation,
} from "@/services/queries/integration";
import { Spinner } from "@heroui/spinner";
import { useRouter } from "next/navigation";

interface PartnerDetailsProps {
  id: string;
}

const PartnerDetails = ({ id }: PartnerDetailsProps) => {
  const router = useRouter();
  const targetWindow = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  const { data: integration } = useIntegrationQuery(id);
  const authorizeIntegration = useAuthorizeIntegrationMutation({
    onSuccess(data) {
      if (data.appInstallUrl) {
        targetWindow.current = window.open(undefined, "_blank");
        targetWindow.current.location = data.appInstallUrl;
      } else {
        setLoading(false);
      }
    },
    onError() {
      setLoading(false);
    },
  });

  const saveIntegration = useSaveIntegrationMutation({
    onSuccess(data) {
      setLoading(false);
      router.push("/integrations");
    },
  });

  const onConnect = () => {
    if (integration?.connectionMethod === "oauth") {
      setLoading(true);
      authorizeIntegration.mutate({
        integrationID: integration.integrationID,
      });
    }
  };

  const handleMessage = (event: MessageEvent) => {
    const { data } = event;
    const { event: e, payload } = data;
    if (e === "app.authorize" && payload) {
      if (targetWindow.current) {
        targetWindow.current.close();
        targetWindow.current = null;
      }

      saveIntegration.mutate({
        integrationID: integration?.integrationID ?? "",
        authorizationCode: payload.authorizationCode,
      });
    }
  };

  useEffect(() => {
    if (integration) {
      window.addEventListener("message", handleMessage, false);
    }
    return () => {
      window.removeEventListener("message", handleMessage, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [integration]);

  return integration ? (
    <div>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 min-h-14 gap-4 -mt-10">
        <div className="flex items-center gap-4">
          <Link href="/integrations">
            <MdArrowBack size="1.375rem" />
          </Link>
          <div>
            <p className="text-xs">Back to Integrations</p>
            <p className="text-base leading-none">
              {integration.integrationName}
            </p>
          </div>
        </div>
        <Button
          isDisabled={
            integration.connections && integration.connections.length > 0
          }
          isLoading={authorizeIntegration.isPending || loading}
          radius="sm"
          color="primary"
          onPress={onConnect}
        >
          {integration.connections && integration.connections.length > 0
            ? "Connected"
            : "Connect"}
        </Button>
      </div>
      <div className="">
        <div className="px-8 py-6 flex items-center gap-6 w-full border-b border-gray-100">
          <Image
            className="rounded"
            src={integration.integrationImage}
            style={{
              display: "block",
              width: "4rem",
              height: "4rem",
            }}
            alt={integration.integrationName}
            width={64}
            height={64}
          />
          <div className="flex flex-col">
            <p className="text-lg font-semibold">
              {integration.integrationName}
            </p>
            <p className="text-[0.825rem] text-foreground-600">
              Check the guidelines below to integrate your Salla store into your
              account.
            </p>
          </div>
        </div>
        <div className="p-8 integration-detail-grid-view border-b border-gray-100">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">
              About {integration.integrationName}
            </p>
            <p className="text-[0.825rem] text-foreground-600">
              {integration.integrationAbout}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default PartnerDetails;
