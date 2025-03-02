import React, { useEffect, useRef } from "react";
import { Order, useCancelOrderMutation } from "@/services/queries/order";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { FaSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";
import { useQueryClient } from "@tanstack/react-query";

interface CancelModalProps extends Order {
  onClose: () => void;
}

const CancelModal = ({ orderID, orderNumber, onClose }: CancelModalProps) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const cancelOrder = useCancelOrderMutation({
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onClose();
    },
  });

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = (openState: boolean) => {
    if (!openState) onClose();
    onOpenChange();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values: any = Object.fromEntries(
      new FormData(e.currentTarget as any)
    );
    cancelOrder.mutate({ ...values, orderID });
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldBlockScroll
      radius="sm"
      isDismissable={false}
      onOpenChange={handleClose}
      closeButton={<RxCross2 fontSize="2.5rem" color="#171717" />}
      className="max-h-[calc(100%_-_4rem)] max-w-[52rem]"
      classNames={{ backdrop: "modal-backdrop" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Cancel Order
            </ModalHeader>
            <ModalBody>
              <Form
                className="flex flex-col justify-center items-center gap-4"
                onSubmit={onSubmit}
                validationBehavior="native"
              >
                <FormInput
                  className="w-full"
                  label="Order Number"
                  isReadOnly
                  defaultValue={orderNumber}
                  name="orderNumber"
                  isDisabled
                  labelPlacement="outside"
                  placeholder=" "
                />
                <FormTextArea
                  className="w-full"
                  label="Cancel Reason"
                  isRequired
                  name="cancelReason"
                  labelPlacement="outside"
                  placeholder=" "
                />
                <button
                  ref={submitButtonRef}
                  className="invisible"
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="bordered"
                className="border-small"
                radius="sm"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="solid"
                radius="sm"
                onPress={() => {
                  if (submitButtonRef.current) submitButtonRef.current.click();
                }}
                isLoading={cancelOrder.isPending}
                startContent={<FaSave className="h-4 w-4" />}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CancelModal;
