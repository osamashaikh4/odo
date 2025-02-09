import { Button } from "@heroui/react";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GoX } from "react-icons/go";
import { toast } from "react-toastify";

export const onSuccessToast = (data: any) => {
  if (data.message)
    toast(
      ({ closeToast }) => (
        <div className="toast-container">
          <div className="toast-identifier success" />
          <div className="flex justify-between items-center w-full toast-body">
            <div className="flex items-center gap-3">
              <FaRegCircleCheck className="w-9 h-9" color="#007C52" />
              <p className="text-sm leading-tight font-bold break-words text-dark">
                {data.message}
              </p>
            </div>
            <Button
              className="!border-none rounded-full p-0"
              onPress={() => closeToast()}
              variant="bordered"
              style={{ height: 30, width: 30 }}
            >
              <GoX fontSize="1.35rem" color="#2d2e2f" />
            </Button>
          </div>
        </div>
      ),
      {
        closeButton: <></>,
      }
    );
};

export const onErrorToast = (error: any) => {
  if (error?.response?.data?.error)
    toast(
      ({ closeToast }) => (
        <div className="toast-container">
          <div className="toast-identifier error" />
          <div className="flex justify-between items-center w-full toast-body">
            <div className="flex items-center gap-3">
              <FaRegTimesCircle className="w-9 h-9" color="#d71616" />
              <p className="text-sm leading-tight break-words text-dark">
                {error?.response?.data?.error}
              </p>
            </div>
            <Button
              className="!border-none rounded-full p-0"
              onPress={() => closeToast()}
              variant="bordered"
              style={{ height: 30, width: 30 }}
            >
              <GoX fontSize="1.35rem" color="#2d2e2f" />
            </Button>
          </div>
        </div>
      ),
      {
        closeButton: <></>,
      }
    );
};
