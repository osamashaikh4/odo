import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

interface AlertModalProps {
  title?: string;
  content?: React.ReactNode;
  onClose: () => void;
  onAction: () => void;
  isLoading?: boolean;
  primaryButtonText?: string;
}

const AlertModal = ({
  title,
  onClose,
  content,
  onAction,
  isLoading,
  primaryButtonText,
}: AlertModalProps) => {
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
      onOpenChange={handleClose}
      radius="sm"
      classNames={{ backdrop: "modal-backdrop" }}
      closeButton={<RxCross2 fontSize="2.25rem" color="#171717" />}
      className="max-w-[34rem]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{content}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                radius="sm"
                isLoading={isLoading}
                color="danger"
                onPress={onAction}
              >
                {primaryButtonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AlertModal;
