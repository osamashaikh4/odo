import React, { useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import DataGrid from "../common/DataGrid";
import { Order } from "@/services/queries/order";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import FormAutoComplete from "../common/FormAutoComplete";

interface RateModalProps {
  orders: Order[];
  onClose: () => void;
}

const columns = [
  { field: "orderNumber", headerName: "Order ID" },
  {
    field: "city",
    headerName: "Destination",
    render: (_: string, row: Order) => <>{row.address.city}</>,
  },
  {
    field: "deliveryCompany",
    headerName: "Delivery Company",
  },
];

const RateModal = ({ orders, onClose }: RateModalProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = (openState: boolean) => {
    if (!openState) onClose();
    onOpenChange();
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldBlockScroll
      radius="sm"
      isDismissable={false}
      onOpenChange={handleClose}
      closeButton={<RxCross2 fontSize="2.5rem" color="#171717" />}
      className="max-h-[calc(100%_-_4rem)] max-w-[88rem]"
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
                    col.render = () => (
                      <FormAutoComplete
                        className="w-[20rem] mx-auto"
                        options={[]}
                        variant="bordered"
                        listboxProps={{
                          topContent: (
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
              <Button color="primary" radius="sm">
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
