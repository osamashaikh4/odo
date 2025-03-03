import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { RxCross2 } from "react-icons/rx";
import { cn } from "@/helpers";

interface ProductImageModalProps {
  image: string;
  title?: string;
  onClose: () => void;
  modalClassName?: string;
  modalImageClassName?: string;
}

const ProductImageModal = ({
  image,
  title,
  onClose,
  modalClassName,
  modalImageClassName,
}: ProductImageModalProps) => {
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
      className={cn(
        "max-h-[calc(100%_-_24rem)] h-full max-w-[55rem]",
        modalClassName
      )}
      classNames={{ backdrop: "modal-backdrop" }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody className="px-1 overflow-auto">
              <img
                src={
                  image.includes("/assets/products")
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}${image}`
                    : image
                }
                alt={title}
                className={cn(
                  "object-contain rounded w-full h-[453px] block",
                  modalImageClassName
                )}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductImageModal;
