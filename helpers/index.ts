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
  const key = e.key;
  let value = e.target.value;

  // Allow numbers (0-9)
  if (/^[0-9]$/.test(key)) {
    // If the input starts with '0' and another number is typed, replace '0' with the new number
    if (value === "0") {
      e.target.value = key; // Replace '0' with the typed number
      e.preventDefault();
    }
    // If there's a decimal, ensure max 7 digits after it
    const decimalIndex = value.indexOf(".");
    if (decimalIndex !== -1 && value.length - decimalIndex > 8) {
      e.preventDefault();
    }
    return;
  }

  // Allow one decimal point only after a number
  if (allowDecimal && key === ".") {
    if (!value || value.includes(".")) {
      e.preventDefault(); // Prevent decimal at the start or multiple decimals
    }
    return;
  }

  // Prevent all other characters
  e.preventDefault();
};
