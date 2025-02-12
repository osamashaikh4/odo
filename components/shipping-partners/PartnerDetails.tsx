"use client";
import React, { useState } from "react";
import { Alert, Button, Form } from "@heroui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Image from "next/image";
import { IoChevronForward } from "react-icons/io5";
import FormInput from "../common/FormInput";
import { FaPlug } from "react-icons/fa";

interface PartnerDetailsProps {
  id: string;
}

const PartnerDetails = ({ id }: PartnerDetailsProps) => {
  const [loading, setLoading] = useState(false);

  const onConnect = () => {};

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 min-h-14 gap-4 -mt-10 mb-7">
        <div className="flex items-center gap-4">
          <Link href="/shipping-partners">
            <MdArrowBack size="1.375rem" />
          </Link>
          <div>
            <p className="text-base">Shipping Partners</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button radius="sm" color="primary" variant="bordered">
            Cancel
          </Button>
          <Button
            radius="sm"
            color="primary"
            endContent={<IoChevronForward fontSize="1.125rem" />}
            onPress={onConnect}
          >
            Next Step
          </Button>
        </div>
      </div>
      <div className="px-6" style={{ height: "calc(100% - 50px)" }}>
        <div className="p-8 rounded border border-gray-200 overflow-auto h-full">
          <Form
            onSubmit={onSubmit}
            validationBehavior="native"
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-3 w-fit">
              <Image
                src="https://storage.googleapis.com/tryoto-public/delivery-logo/jandt.png"
                style={{
                  display: "block",
                  width: "3rem",
                  height: "3rem",
                }}
                alt="J&T Express"
                width={42}
                height={42}
              />
              <p className="text-base font-semibold">J&T Express</p>
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
                defaultValue="J0086005003"
                placeholder=" "
              />
              <FormInput
                label="apiAccount"
                labelPlacement="outside"
                isRequired
                defaultValue="344471219040423945"
                placeholder=" "
              />
              <FormInput
                label="privateKey"
                labelPlacement="outside"
                isRequired
                defaultValue="17e26fb32fc440f3b4497651dbb2159e"
                placeholder=" "
              />
              <FormInput
                label="Password"
                labelPlacement="outside"
                isRequired
                defaultValue="Aa12345678"
                placeholder=" "
              />
              {/* Type of service: 02 store delivery; 01 door-to-door pickup */}
              <FormInput
                label="Service Type"
                labelPlacement="outside"
                isRequired
                placeholder=" "
                defaultValue="02"
              />
              {/* Order type (customer number is monthly settlement) 1. Individual customers; 2. Monthly settlement; */}
              <FormInput
                label="orderType"
                labelPlacement="outside"
                isRequired
                placeholder=" "
                defaultValue="1"
              />
              {/* Delivery type: 03 home delivery Delivery Type: 06 Store Pickup */}
              <FormInput
                label="Delivery Method"
                labelPlacement="outside"
                isRequired
                placeholder=" "
                defaultValue="03"
              />
              <FormInput
                label="expressType"
                labelPlacement="outside"
                isRequired
                placeholder=" "
                defaultValue="EZKSA"
              />
              <div>
                <Button
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
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
