import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  ModalProps,
  useDisclosure,
} from "@heroui/react";
import { RxCross2 } from "react-icons/rx";
import { IconBaseProps } from "react-icons/lib";

interface BaseModalProps extends Omit<ModalProps, "content" | "children"> {
  onClose: () => void;
  header?: React.ReactNode;
  headerProps?: ModalHeaderProps;
  content?: React.ReactNode;
  contentProps?: ModalBodyProps;
  footer?: React.ReactNode;
  footerProps?: ModalFooterProps;
  closeButtonProps?: IconBaseProps;
}

const BaseModal = ({
  onClose,
  header,
  content,
  footer,
  headerProps,
  contentProps,
  footerProps,
  closeButtonProps,
  ...props
}: BaseModalProps) => {
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
      closeButton={
        <RxCross2 fontSize="2.5rem" color="#171717" {...closeButtonProps} />
      }
      className="max-h-[calc(100%_-_5rem)] h-full max-w-[90rem]"
      classNames={{ backdrop: "modal-backdrop" }}
      {...props}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1" {...headerProps}>
              {header}
            </ModalHeader>
            <ModalBody className="px-1 overflow-auto" {...contentProps}>
              {content}
            </ModalBody>
            {footer && <ModalFooter {...footerProps}>{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
