import React, { useEffect } from "react";
import { useOrderQuery } from "@/services/queries/order";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { RxCross2 } from "react-icons/rx";
import { PDFViewer } from "@react-pdf/renderer";
import OrderDetailsDocument from "./OrderDetailsDocument";

interface OrderPrintModalProps {
  orderID: string;
  onClose: () => void;
}

const OrderPrintModal = ({ orderID, onClose }: OrderPrintModalProps) => {
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
      className="max-h-[calc(100%_-_4rem)] max-w-[90rem]"
      classNames={{ backdrop: "modal-backdrop" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Order Details
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
              <div className="p-2">
                {data && (
                  <PDFViewer width="100%" height={700}>
                    <OrderDetailsDocument order={data} />
                  </PDFViewer>
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderPrintModal;
