"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
} from "@heroui/react";
import { useEffect, useState } from "react";
import FormInput from "../common/FormInput";
import { GoPlus, GoSync } from "react-icons/go";
import {
  Integration,
  useSyncOrdersMutation,
} from "@/services/queries/integration";
import { useQueryClient } from "@tanstack/react-query";

interface SyncOrdersModalProps {
  integration: Integration;
  onClose: () => void;
}

const SyncOrdersModal = ({ integration, onClose }: SyncOrdersModalProps) => {
  const queryClient = useQueryClient();
  const [orderID, setOrderID] = useState("");
  const [orderIDs, setOrderIDs] = useState<string[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const syncOrders = useSyncOrdersMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
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

  const onSync = () => {
    syncOrders.mutate({ orderIDs, integrationID: integration.integrationID });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Synchronize Orders
            </ModalHeader>
            <ModalBody>
              <FormInput
                endContent={
                  <GoPlus
                    fontSize="1.25rem"
                    onClick={() => {
                      if (orderID) {
                        setOrderIDs([...orderIDs, orderID]);
                        setOrderID("");
                      }
                    }}
                  />
                }
                size="md"
                labelPlacement="outside"
                label="Order ID"
                placeholder=" "
                value={orderID}
                onChange={(e) => setOrderID(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && orderID) {
                    setOrderIDs([...orderIDs, orderID]);
                    setOrderID("");
                  }
                }}
              />
              <div className="flex items-center flex-wrap gap-2">
                {orderIDs.map((orderID, i) => (
                  <Chip
                    key={orderID + i}
                    onClose={() =>
                      setOrderIDs([...orderIDs.filter((_, oi) => oi !== i)])
                    }
                  >
                    {orderID}
                  </Chip>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="light"
                radius="sm"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                startContent={<GoSync fontSize="1rem" />}
                isDisabled={orderIDs.length === 0}
                onPress={onSync}
                isLoading={syncOrders.isPending}
                color="primary"
                radius="sm"
              >
                Synchronize
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SyncOrdersModal;
