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
  console.log(789);
  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = (openState: boolean) => {
    if (!openState) onClose();
    onOpenChange();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              <DataGrid
                classNames={{ container: "p-0", thead: "border-0" }}
                showFooter={false}
                columns={columns.map((col) => {
                  if (col.field === "deliveryCompany") {
                    col.render = () => (
                      <Autocomplete
                        className="w-[20rem] mx-auto"
                        defaultItems={[]}
                        variant="bordered"
                        inputProps={{
                          classNames: { inputWrapper: "border-small rounded" },
                        }}
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
                      >
                        {(item) => (
                          <AutocompleteItem key={item.value}>
                            {item.label}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
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
              {/* <Button
                color="primary"
                variant="light"
                radius="sm"
                onPress={onClose}
              >
                Cancel
              </Button> */}
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
