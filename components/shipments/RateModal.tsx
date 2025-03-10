import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import DataGrid from "../common/DataGrid";
import { Order, useShipOrdersMutation } from "@/services/queries/order";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import FormAutoComplete from "../common/FormAutoComplete";
import { useConnectedShippingPartnersQuery } from "@/services/queries/shipping-partner";
import { Column } from "../common/Table";

interface RateModalProps {
  orders: Order[];
  onFinish?: () => void;
  onClose: () => void;
}

const columns: Column[] = [
  { field: "orderNumber", headerName: "Order ID" },
  {
    field: "city",
    headerName: "Destination",
    render: ({ row }) => <>{row.address.city}</>,
  },
  {
    field: "deliveryCompany",
    headerName: "Delivery Company",
  },
];

const RateModal = ({ orders, onClose, onFinish }: RateModalProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shipments, setShipments] = useState<
    { orderID: string; shippingPartnerConnectionID: string }[]
  >(
    orders && orders.length > 0
      ? orders.map((order) => ({
          orderID: order.orderID,
          shippingPartnerConnectionID: "automatic",
        }))
      : []
  );
  const { data: connectedShippingPartners = [], isFetching } =
    useConnectedShippingPartnersQuery();

  const shipOrders = useShipOrdersMutation({
    onSuccess() {
      onClose();
      if (onFinish) onFinish();
    },
  });

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = (openState: boolean) => {
    if (!openState) onClose();
    onOpenChange();
  };

  const onCreateShipment = () => {
    shipOrders.mutate({
      orders: shipments.map((shipment) => ({
        ...shipment,
        shippingPartnerConnectionID:
          shipment.shippingPartnerConnectionID === "automatic"
            ? connectedShippingPartners[0].shippingPartnerConnection
                ?.shippingPartnerConnectionID
            : shipment.shippingPartnerConnectionID,
      })),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldBlockScroll
      radius="sm"
      isDismissable={false}
      onOpenChange={handleClose}
      closeButton={<RxCross2 fontSize="2.5rem" color="#171717" />}
      className="max-h-[calc(100%_-_4rem)] max-w-[80rem]"
      classNames={{ backdrop: "modal-backdrop" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Shipment
            </ModalHeader>
            <ModalBody>
              <DataGrid
                classNames={{ container: "p-0", thead: "border-0" }}
                showFooter={false}
                columns={columns.map((col) => {
                  if (col.field === "deliveryCompany") {
                    col.render = ({ row }: { row: Order }) => (
                      <FormAutoComplete
                        className="w-[20rem] mx-auto"
                        options={[
                          ...(connectedShippingPartners.length > 0
                            ? [
                                {
                                  label: "Automatic Shipment",
                                  value: "automatic",
                                },
                              ]
                            : []),
                          ...connectedShippingPartners.map(
                            (connectedShippingPartner) => ({
                              label:
                                connectedShippingPartner.shippingPartnerName,
                              value:
                                connectedShippingPartner
                                  .shippingPartnerConnection
                                  ?.shippingPartnerConnectionID ?? "",
                            })
                          ),
                        ]}
                        selectedKey={
                          connectedShippingPartners.length > 0
                            ? "automatic"
                            : undefined
                        }
                        isLoading={isFetching}
                        variant="bordered"
                        listboxProps={{
                          topContent:
                            connectedShippingPartners.length > 0 ? null : (
                              <Button
                                onPress={() => {
                                  onClose();
                                  router.push("/shipping-partners");
                                }}
                                color="primary"
                                variant="light"
                                size="sm"
                                radius="sm"
                              >
                                Connect Shipping Partners
                              </Button>
                            ),
                        }}
                        onSelectionChange={(k: any) => {
                          const tmp = [...shipments];
                          const i = shipments.findIndex(
                            (s) => s.orderID === row.orderID
                          );

                          if (i >= 0) {
                            tmp[i] = {
                              orderID: row.orderID,
                              shippingPartnerConnectionID: k,
                            };
                          } else {
                            tmp.push({
                              orderID: row.orderID,
                              shippingPartnerConnectionID: k,
                            });
                          }
                          setShipments(tmp);
                        }}
                        popoverProps={{ radius: "sm" }}
                        size="md"
                        radius="sm"
                        placeholder="Search"
                      />
                    );
                  }
                  return { ...col };
                })}
                filters={{}}
                onAction={console.log}
                count={orders.length}
                rows={orders}
                outerAction={() => <></>}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={shipOrders.isPending}
                color="primary"
                radius="sm"
                isDisabled={connectedShippingPartners.length === 0}
                onPress={onCreateShipment}
              >
                Create Shipment
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RateModal;
