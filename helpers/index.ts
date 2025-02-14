import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PaymentMethods = [
  { label: "Paid", value: "paid" },
  { label: "Cash on Delivery", value: "cod" },
];

export const PaymentMethodsMap = PaymentMethods.reduce((acc: any, curr) => {
  acc[curr.value] = curr.label;
  return acc;
}, {});

export const OrderStateMap: { [key: string]: string } = {
  assigned: "Assigned to Warehouse",
};

export const isNumber = (e: any, allowDecimal?: boolean) => {
  if (!/([0-9])/g.test(e.key)) {
    e.preventDefault();
  }
};
