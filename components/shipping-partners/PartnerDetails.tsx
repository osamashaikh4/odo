"use client";
import React, { useRef } from "react";
import { Alert, Button, Form, Spinner } from "@heroui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Image from "next/image";
import FormInput from "../common/FormInput";
import { FaPlug } from "react-icons/fa";
import {
  useSaveShippingPartnerConnectionMutation,
  useShippingPartnerQuery,
  useTestConnectionMutation,
  useUpdateShippingPartnerConnectionMutation,
} from "@/services/queries/shipping-partner";
import EmptyRecords from "../common/EmptyRecords";
import { useRouter } from "next/navigation";

interface PartnerDetailsProps {
  id: string;
  connectionID?: string;
}

const PartnerDetails = ({ id, connectionID }: PartnerDetailsProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { data: shippingPartner, isFetching } = useShippingPartnerQuery({
    id,
    connectionID,
  });

  const testConnection = useTestConnectionMutation({});

  const saveConnection = useSaveShippingPartnerConnectionMutation({
    onSuccess() {
      router.push("/shipping-partners/connected-partners");
    },
  });

  const updateConnection = useUpdateShippingPartnerConnectionMutation({
    onSuccess() {
      router.push("/shipping-partners/connected-partners");
    },
  });

  const onConnect = () => {
    if (ref.current) ref.current.click();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bType = document.activeElement?.id;

    const values: any = Object.fromEntries(
      new FormData(e.currentTarget as any)
    );

    if (bType === "test-connection") {
      testConnection.mutate({
        ...values,
        shippingPartnerID: shippingPartner?.shippingPartnerID,
      });
    } else if (
      bType === "save-connection" ||
      bType === "save-connection-bogus"
    ) {
      if (connectionID) {
        updateConnection.mutate({
          id: connectionID,
          ...values,
          shippingPartnerID: shippingPartner?.shippingPartnerID,
        });
      } else {
        saveConnection.mutate({
          ...values,
          shippingPartnerID: shippingPartner?.shippingPartnerID,
        });
      }
    }
  };

  return shippingPartner ? (
    <div className="h-full">
      <div className="flex items-center justify-between pr-6 pl-4 py-3 border-b border-gray-100 min-h-14 gap-4 -mt-10 mb-6 bg-white">
        <div className="flex items-center gap-2">
          <Link href="/shipping-partners">
            <Button isIconOnly variant="light">
              <MdArrowBack size="1.375rem" />
            </Button>
          </Link>
          <div>
            <p className="text-base">Shipping Partners</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            radius="sm"
            color="primary"
            type="button"
            variant="bordered"
            className="border-small"
            onPress={() => router.push("/shipping-partners")}
          >
            Cancel
          </Button>
          <Button
            isDisabled={Boolean(
              shippingPartner.shippingPartnerConnection &&
                shippingPartner.shippingPartnerConnection
                  .shippingPartnerConnectionID &&
                !connectionID
            )}
            radius="sm"
            color="primary"
            isLoading={saveConnection.isPending || updateConnection.isPending}
            id="save-connection-bogus"
            // endContent={<IoChevronForward fontSize="1.125rem" />}
            onPress={onConnect}
          >
            {shippingPartner.shippingPartnerConnection &&
            shippingPartner.shippingPartnerConnection
              .shippingPartnerConnectionID &&
            !connectionID
              ? "Saved"
              : "Save"}
          </Button>
        </div>
      </div>
      <div className="px-6" style={{ height: "calc(100% - 50px)" }}>
        <div className="p-8 rounded border border-borderDarkGrey overflow-auto h-full bg-white">
          {!connectionID || (connectionID && shippingPartner) ? (
            <Form
              onSubmit={onSubmit}
              validationBehavior="native"
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 w-fit">
                <Image
                  src={shippingPartner.shippingPartnerLogo}
                  style={{
                    display: "block",
                    width: "3rem",
                    height: "3rem",
                  }}
                  alt={shippingPartner.shippingPartnerName}
                  width={42}
                  height={42}
                />
                <p className="text-base font-semibold">
                  {shippingPartner.shippingPartnerName}
                </p>
              </div>
              <div className="w-full flex items-center my-3">
                <Alert
                  color="primary"
                  title="Enter the below information from your account with the shipping companies to connect it"
                />
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                <FormInput
                  label="Customer Code"
                  labelPlacement="outside"
                  isRequired
                  name="customerCode"
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .customerCode
                      : "J0086024173"
                  }
                  // defaultValue="J0086004989"
                  placeholder=" "
                />
                <FormInput
                  label="apiAccount"
                  name="apiAccount"
                  labelPlacement="outside"
                  isRequired
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .apiAccount
                      : "292508153084379141"
                  }
                  // defaultValue="762307940458700828"
                  placeholder=" "
                />
                <FormInput
                  label="privateKey"
                  name="privateKey"
                  labelPlacement="outside"
                  isRequired
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .privateKey
                      : "a0a1047cce70493c9d5d29704f05d0d9"
                  }
                  // defaultValue="6b5ff8c7703a4a54b7cb77c8ed065d81"
                  placeholder=" "
                />
                <FormInput
                  label="Password"
                  name="password"
                  labelPlacement="outside"
                  isRequired
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .password
                      : "Aa123456"
                  }
                  // defaultValue="Ab87654321"
                  placeholder=" "
                />
                <FormInput
                  label="constant"
                  name="constant"
                  labelPlacement="outside"
                  isRequired
                  placeholder=" "
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .constant
                      : "jadada236t2"
                  }
                />
                {/* Type of service: 02 store delivery; 01 door-to-door pickup */}
                <FormInput
                  label="Service Type"
                  name="serviceType"
                  labelPlacement="outside"
                  isRequired
                  placeholder=" "
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .serviceType
                      : "02"
                  }
                />
                {/* Order type (customer number is monthly settlement) 1. Individual customers; 2. Monthly settlement; */}
                <FormInput
                  label="orderType"
                  name="orderType"
                  labelPlacement="outside"
                  isRequired
                  placeholder=" "
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .orderType
                      : "1"
                  }
                />
                {/* Delivery type: 03 home delivery Delivery Type: 06 Store Pickup */}
                <FormInput
                  label="Delivery Method"
                  name="deliveryMethod"
                  labelPlacement="outside"
                  isRequired
                  placeholder=" "
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .deliveryMethod
                      : "03"
                  }
                />
                {/* Express type: only supports EZ: standard (UAE); EZKSA: standard
              (KSA); Reverse: Reverse (KSA); ReverseUAE: Reverse (UAE) SDD: Same
              Day (KSA) SDDUAE: Same Day (UAE) SCH: SCHEDULE (KSA) SCHUAE:
              SCHEDULE (UAE) */}
                <FormInput
                  label="expressType"
                  name="expressType"
                  labelPlacement="outside"
                  isRequired
                  placeholder=" "
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .expressType
                      : "EZKSA"
                  }
                />
                {/* Dropdown CC_CASH, PP_PM */}
                <FormInput
                  label="payType"
                  name="payType"
                  labelPlacement="outside"
                  isRequired
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields.payType
                      : "PP_PM"
                  }
                  placeholder=" "
                />
                {/* Dropdown 0, 1 */}
                <FormInput
                  label="isNeedOfferFee"
                  name="isNeedOfferFee"
                  labelPlacement="outside"
                  isRequired
                  placeholder=" "
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .isNeedOfferFee
                      : "1"
                  }
                />
                {/* Dropdown True, False */}
                <FormInput
                  label="sendItems"
                  name="sendItems"
                  labelPlacement="outside"
                  isRequired
                  placeholder=" "
                  defaultValue={
                    shippingPartner?.shippingPartnerConnection?.fields
                      ? shippingPartner.shippingPartnerConnection.fields
                          .sendItems
                      : "1"
                  }
                />
                <div>
                  <button
                    type="submit"
                    ref={ref}
                    id="save-connection"
                    className="h-0 invisible"
                  ></button>
                  <Button
                    id="test-connection"
                    type="submit"
                    color="primary"
                    radius="sm"
                    startContent={<FaPlug fontSize="1rem" />}
                  >
                    Test Connection
                  </Button>
                </div>
              </div>
            </Form>
          ) : null}
        </div>
      </div>
    </div>
  ) : isFetching ? (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  ) : (
    <EmptyRecords />
  );
};

export default PartnerDetails;
