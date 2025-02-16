import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Form,
  Spinner,
} from "@heroui/react";
import React, { useEffect, useRef, useState } from "react";
import { parseZonedDateTime } from "@internationalized/date";
import { RxCross2 } from "react-icons/rx";
import {
  useOrderQuery,
  useUpdateOrderMutation,
} from "@/services/queries/order";
import { useQueryClient } from "@tanstack/react-query";
import ReceiverDetailsForm from "./ReceiverDetailsForm";
import OrderDetailsForm from "./OrderDetailsForm";
import Tabs from "../common/Tabs";
import { FaPrint, FaSave } from "react-icons/fa";

interface OrderDetailsModalProps {
  orderID: string;
  isView?: boolean;
  onClose: () => void;
}

const OrderDetailsModal = ({
  isView,
  onClose,
  orderID,
}: OrderDetailsModalProps) => {
  const queryClient = useQueryClient();
  const submitButtoRef = useRef<HTMLButtonElement>(null);
  const [selectedTab, setSelectedTab] = useState("receiver-details");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, isFetching, refetch } = useOrderQuery(orderID);

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = (openState: boolean) => {
    if (!openState) onClose();
    onOpenChange();
  };

  const updateOrder = useUpdateOrderMutation({
    onSuccess() {
      refetch();
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      onClose();
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let values;
    const allData: any = Object.fromEntries(
      new FormData(e.currentTarget as any)
    );

    if (selectedTab === "receiver-details") {
      values = {
        receiver: {
          customer: {
            customerFirstName: allData.customerFirstName,
            customerLastName: allData.customerLastName,
            customerEmail: allData.customerEmail,
            customerPhone: allData.customerPhone,
          },
          address: {
            address: allData.address,
            city: allData.city,
            state: allData.state,
            country: allData.country,
            district: allData.district,
            zipCode: allData.zipCode,
            streetName: allData.streetName,
            building: allData.building,
          },
        },
        orderID: data?.orderID,
      };
    } else if (selectedTab === "order-details") {
      const parsedDateTime = parseZonedDateTime(allData.orderDate);
      values = {
        orderID: data?.orderID,
        order: {
          orderDate: parsedDateTime.toAbsoluteString(),
          orderTimeZone: parsedDateTime.timeZone,
          paymentMethod: allData.paymentMethod,
          orderAmount: parseFloat(allData.orderAmount),
          orderCurrency: allData.orderCurrency,
          orderDescription: allData.orderDescription,
          items: Object.keys(allData)
            .filter((key) => key.startsWith("orderItemName"))
            .map((key) => {
              const index = key.replace("orderItemName", "");
              return {
                orderItemName: allData[`orderItemName${index}`],
                orderItemSku: allData[`orderItemSku${index}`],
                orderItemQuantity: parseInt(
                  allData[`orderItemQuantity${index}`],
                  10
                ),
                orderItemPrice: parseFloat(allData[`orderItemPrice${index}`]),
                orderItemTax:
                  allData[`orderItemTax${index}`] &&
                  allData[`orderItemTax${index}`] != "" &&
                  allData[`orderItemTax${index}`] != undefined &&
                  allData[`orderItemTax${index}`] != null
                    ? parseFloat(allData[`orderItemTax${index}`])
                    : undefined,
                orderItemTotal: parseFloat(allData[`orderItemTotal${index}`]),
                orderItemCurrency: "SAR",
              };
            }),
        },
      };
    }

    if (values) {
      updateOrder.mutate(values);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldBlockScroll
      radius="sm"
      isDismissable={false}
      onOpenChange={handleClose}
      closeButton={<RxCross2 fontSize="2.5rem" color="#171717" />}
      className="max-h-[calc(100%_-_4rem)] max-w-[91rem]"
      classNames={{ backdrop: "modal-backdrop" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isView ? "View Order" : "Edit Order"}{" "}
              {data?.orderNumber ? `(${data.orderNumber})` : ""}
            </ModalHeader>
            <ModalBody className="px-1 overflow-auto">
              {isFetching && (
                <div
                  className="absolute h-full w-full flex items-center justify-center z-20"
                  style={{ backdropFilter: "blur(1px)" }}
                >
                  <Spinner size="lg" />
                </div>
              )}
              <Tabs
                selected={selectedTab}
                options={[
                  {
                    title: "Receiver Details",
                    key: "receiver-details",
                    href: "",
                  },
                  {
                    title: "Order Details",
                    key: "order-details",
                    href: "",
                  },
                ]}
                onSelectionChange={setSelectedTab as any}
              />
              <Form onSubmit={onSubmit} validationBehavior="native">
                {data ? (
                  <>
                    {selectedTab === "receiver-details" ? (
                      <ReceiverDetailsForm
                        isView={isView}
                        values={{ ...data?.customer, ...data?.address }}
                      />
                    ) : (
                      <OrderDetailsForm
                        isEdit
                        isView={isView}
                        values={{ ...data }}
                      />
                    )}
                  </>
                ) : null}
                <button
                  ref={submitButtoRef}
                  type="submit"
                  className="invisible"
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              {!isView && (
                <Button
                  color="primary"
                  variant="light"
                  radius="sm"
                  onPress={onClose}
                >
                  Cancel
                </Button>
              )}
              <Button
                color="primary"
                radius="sm"
                className={isView ? "border-small" : ""}
                variant={isView ? "bordered" : undefined}
                startContent={
                  isView ? (
                    <FaPrint className="h-4 w-4" />
                  ) : (
                    <FaSave className="h-4 w-4" />
                  )
                }
                isLoading={updateOrder.isPending}
                onPress={() => {
                  if (submitButtoRef.current) submitButtoRef.current.click();
                }}
              >
                {isView ? "Print" : "Save"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailsModal;
