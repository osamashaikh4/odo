import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { RxCross2 } from "react-icons/rx";
import { Document, PDFViewer } from "@react-pdf/renderer";
import BarcodeDocument from "./BarcodeDocument";

interface BarcodeGeneratorModalProps {
  barcodes: string[];
  onClose: () => void;
}

const BarcodeGeneratorModal = ({
  barcodes,
  onClose,
}: BarcodeGeneratorModalProps) => {
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
      className="max-h-[calc(100%_-_20rem)] h-full max-w-[51rem]"
      classNames={{ backdrop: "modal-backdrop" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Barcode Generator
            </ModalHeader>
            <ModalBody className="px-1 overflow-auto">
              <PDFViewer width="100%" height="500px">
                <Document>
                  {barcodes.map((barcode) => (
                    <BarcodeDocument barcode={barcode} />
                  ))}
                </Document>
              </PDFViewer>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BarcodeGeneratorModal;
