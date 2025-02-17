import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Form,
} from "@heroui/react";
import React, { useEffect, useRef, useState } from "react";
import Stepper from "../common/Stepper";
import { BsPlus } from "react-icons/bs";
import { parseZonedDateTime } from "@internationalized/date";
import { RxCross2 } from "react-icons/rx";
import { useCreateOrderMutation } from "@/services/queries/order";
import { useQueryClient } from "@tanstack/react-query";
import ReceiverDetailsForm from "./ReceiverDetailsForm";
import OrderDetailsForm from "./OrderDetailsForm";

interface OrderModalProps {
  onClose: () => void;
}

const OrderModal = ({ onClose }: OrderModalProps) => {
  const queryClient = useQueryClient();
  const submitButtoRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [values, setValues] = useState({});

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = (openState: boolean) => {
    if (!openState) onClose();
    onOpenChange();
  };

  const createOrder = useCreateOrderMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      onClose();
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: any = Object.fromEntries(
      new FormData(e.currentTarget as any)
    );
    if (active === 0) {
      setValues(formData);
      setActive(1);
    } else {
      const allData = { ...values, ...formData };
      const parsedDateTime = parseZonedDateTime(allData.orderDate);

      const fin = {
        orderNumber: allData.orderNumber,
        orderDate: parsedDateTime.toAbsoluteString(),
        orderTimeZone: parsedDateTime.timeZone,
        paymentMethod: allData.paymentMethod,
        orderAmount: parseFloat(allData.orderAmount),
        orderCurrency: allData.orderCurrency,
        orderDescription: allData.orderDescription,
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
      };

      createOrder.mutate(fin);
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
      className="max-h-[calc(100%_-_5rem)] h-full max-w-[90rem]"
      classNames={{ backdrop: "modal-backdrop" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between w-full">
                <span className="whitespace-nowrap">Add Order</span>
                <Stepper
                  active={active}
                  steps={[
                    { title: "Receiver Details", key: "receiverDetails" },
                    { title: "Order Details", key: "orderDetails" },
                  ]}
                />
                <div></div>
              </div>
            </ModalHeader>
            <ModalBody className="px-1 overflow-auto">
              <Form onSubmit={onSubmit} validationBehavior="native">
                {active === 0 ? (
                  <ReceiverDetailsForm values={values} />
                ) : (
                  <OrderDetailsForm />
                )}
                <button
                  ref={submitButtoRef}
                  type="submit"
                  className="invisible"
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="light"
                radius="sm"
                onPress={onClose}
              >
                Cancel
              </Button>
              {active > 0 && (
                <Button
                  color="primary"
                  variant="bordered"
                  radius="sm"
                  className="border-small"
                  onPress={() => setActive(0)}
                >
                  Previous
                </Button>
              )}
              <Button
                color="primary"
                radius="sm"
                startContent={
                  active === 1 ? <BsPlus className="h-6 w-6" /> : null
                }
                isLoading={createOrder.isPending}
                onPress={() => {
                  if (submitButtoRef.current) submitButtoRef.current.click();
                }}
              >
                {active === 1 ? "Add" : "Next Step"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
