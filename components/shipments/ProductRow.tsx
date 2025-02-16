import React, { useState } from "react";
import { Column } from "../common/Table";
import FormInput from "../common/FormInput";
import QuantityInput from "../common/QuantityInput";
import { isNumber } from "@/helpers";
import { Button } from "@heroui/react";
import { BsTrash } from "react-icons/bs";

interface ProductRowProps {
  row: any;
  isView?: boolean;
  onChange?: (id: string, total: number) => void;
  columns: Column[];
  onRowDelete?: (row: any) => void;
}

const ProductRow = ({
  row,
  columns,
  isView,
  onChange,
  onRowDelete,
}: ProductRowProps) => {
  const [total, setTotal] = useState("");

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceInput: any = document.querySelector(
      `input[name='orderItemPrice${row.id}']`
    );
    let quantityInput: any = document.querySelector(
      `input[name='orderItemQuantity${row.id}']`
    );
    const taxInput: any = document.querySelector(
      `input[name='orderItemTax${row.id}']`
    );

    if (e.target.name === `orderItemQuantity${row.id}`) {
      quantityInput = e.target;
    }

    // Convert values safely
    const price = priceInput ? parseFloat(priceInput.value) || 0 : 0;
    const quantity = quantityInput ? parseInt(quantityInput.value) || 0 : 0;
    const tax = taxInput ? parseFloat(taxInput.value) || 0 : 0;

    const total = price * quantity + tax;

    if (onChange) onChange(row.id, total);
    setTotal(total as any);
  };

  return (
    <tr className="hover:bg-foreground-50 h-12 align-top">
      {columns.map((column, ind) => (
        <td
          className="py-2 px-4 overflow-hidden text-ellipsis text-sm text-dark"
          key={`row--col-${ind}`}
          style={{
            minWidth: 45,
            width: column.width,
            maxWidth: column.width,
          }}
        >
          {column.field === "orderItemName" ? (
            <FormInput
              name={"orderItemName" + row.id}
              isRequired
              isDisabled={isView}
              defaultValue={row.orderItemName}
            />
          ) : column.field === "orderItemSku" ? (
            <FormInput
              isDisabled={isView}
              name={"orderItemSku" + row.id}
              defaultValue={row.orderItemSku}
            />
          ) : column.field === "orderItemQuantity" ? (
            <QuantityInput
              name={"orderItemQuantity" + row.id}
              type="number"
              onChange={handleTotalChange}
              min={1}
              isDisabled={isView}
              defaultValue={row.orderItemQuantity ?? "1"}
              isRequired
            />
          ) : column.field === "orderItemPrice" ? (
            <FormInput
              name={"orderItemPrice" + row.id}
              endContent="SAR"
              isRequired
              isDisabled={isView}
              onChange={handleTotalChange}
              defaultValue={row.orderItemPrice}
              onKeyPress={(e) => isNumber(e, true)}
            />
          ) : column.field === "orderItemTax" ? (
            <FormInput
              name={"orderItemTax" + row.id}
              endContent="SAR"
              isDisabled={isView}
              onChange={handleTotalChange}
              defaultValue={row.orderItemTax}
              onKeyPress={(e) => isNumber(e, true)}
            />
          ) : column.field === "orderItemTotal" ? (
            <FormInput
              name={"orderItemTotal" + row.id}
              isRequired
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              isDisabled={isView}
              endContent="SAR"
              defaultValue={row.orderItemTotal}
              onKeyPress={(e) => isNumber(e, true)}
            />
          ) : (
            <span className="overflow-hidden block text-ellipsis whitespace-nowrap">
              {row[column.field]}
            </span>
          )}
        </td>
      ))}
      <td className="py-1 px-4 whitespace-nowrap space-x-2 text-right">
        <Button
          variant="bordered"
          color="danger"
          radius="sm"
          className="border-small min-w-4 px-3"
          onPress={() => {
            if (onRowDelete) onRowDelete(row);
          }}
        >
          <BsTrash fontSize="1.125rem" />
        </Button>
      </td>
    </tr>
  );
};

export default ProductRow;
