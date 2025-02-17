import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { RxCross2 } from "react-icons/rx";
import { useOrderQuery } from "@/services/queries/order";
import DataGrid from "../common/DataGrid";

interface OrderItemsModal {
  orderID: string;
  onClose: () => void;
}

const OrderItemsModal = ({ orderID, onClose }: OrderItemsModal) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, isFetching } = useOrderQuery(orderID);

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
      className="max-h-[calc(100%_-_4rem)] max-w-[55rem]"
      classNames={{ backdrop: "modal-backdrop" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Order Items {data?.orderNumber ? `(${data.orderNumber})` : ""}
            </ModalHeader>
            <ModalBody className="px-3 pb-3 overflow-auto">
              <DataGrid
                count={0}
                showFooter={false}
                isLoading={isFetching}
                filters={{ limit: 4 }}
                outerAction={() => <></>}
                columns={[
                  { field: "orderItemName", headerName: "Product" },
                  { field: "orderItemSku", headerName: "SKU" },
                  {
                    field: "orderItemQuantity",
                    headerName: "Quantity",
                    align: "center",
                  },
                  { field: "orderItemPrice", headerName: "Price" },
                  { field: "orderItemTax", headerName: "Tax" },
                  { field: "orderItemTotal", headerName: "Total" },
                ]}
                rows={data?.items ?? []}
                onAction={console.log}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderItemsModal;
