import React, { useState } from "react";
import { Column } from "../common/Table";
import FormInput from "../common/FormInput";
import QuantityInput from "../common/QuantityInput";
import { cn, isNumber } from "@/helpers";
import { Button } from "@heroui/react";
import { BsTrash } from "react-icons/bs";
import useDebounce from "@/hooks/useDebounce";
import { useProductsAutoCompleteQuery } from "@/services/queries/order";
import FormAutoComplete from "../common/FormAutoComplete";
import ProductImage from "../product/ProductImage";

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
  const [query, setQuery] = useState("");
  const [name, setName] = useState(row.orderItemName ?? "");
  const [price, setPrice] = useState(row.orderItemPrice ?? "");
  const [sku, setSku] = useState(row.orderItemSku ?? "");
  const [tax, setTax] = useState(row.orderItemTax ?? "");
  const [total, setTotal] = useState(row.orderItemTotal ?? "");

  const debouncedQuery = useDebounce<string>(query, 500);

  const { data: products = [], isFetching } =
    useProductsAutoCompleteQuery(debouncedQuery);

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

  const onSelectionChange = (k: any) => {
    const match = products.find((p) => p.productID == k);
    if (match) {
      setName(match.productName);
      setSku(match.productSku);
      setPrice(match.productPrice as any);
      setTax(match.productTax as any);
      setTimeout(() => {
        handleTotalChange({ target: { name: "" } } as any);
      }, 0);
    }
  };

  return (
    <tr className="hover:bg-foreground-50 h-12 align-top">
      {columns.map((column, ind) => (
        <td
          className={cn(
            "py-2 px-4 overflow-hidden text-ellipsis text-sm text-dark",
            column.field === "orderItemName" ? "px-3" : ""
          )}
          key={`row--col-${ind}`}
          style={{
            minWidth: 45,
            width: column.width,
            maxWidth: column.width,
          }}
        >
          {column.field === "orderItemName" ? (
            // <FormInput
            //   name={"orderItemName" + row.id}
            //   isRequired
            //   isDisabled={isView}
            //   defaultValue={row.orderItemName}
            // />
            <div className="flex items-center gap-2">
              <ProductImage image="" />
              <FormAutoComplete
                allowsCustomValue
                className="w-full"
                isDisabled={isView}
                isRequired
                defaultInputValue={row.orderItemName}
                onInputChange={(v) => {
                  setQuery(v);
                  setName(v);
                }}
                onSelectionChange={onSelectionChange}
                render={(item) => (
                  <div className="grid grid-cols-2 gap-4">
                    <p>{item.productName}</p>
                    <p>{item.productSku}</p>
                  </div>
                )}
                options={products.map((p) => ({
                  label: p.productName,
                  value: p.productID,
                  ...p,
                }))}
                isLoading={isFetching}
              />
              <input
                type="hidden"
                value={name}
                onChange={() => {}}
                name={"orderItemName" + row.id}
              />
            </div>
          ) : column.field === "orderItemSku" ? (
            <FormInput
              isDisabled={isView}
              name={"orderItemSku" + row.id}
              value={sku}
              onChange={(e) => setSku(e.target.value)}
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
              value={price}
              isDisabled={isView}
              onChange={(e) => {
                setPrice(e.target.value);
                handleTotalChange(e);
              }}
              defaultValue={row.orderItemPrice}
              onKeyPress={(e) => isNumber(e, true)}
            />
          ) : column.field === "orderItemTax" ? (
            <FormInput
              name={"orderItemTax" + row.id}
              endContent="SAR"
              isDisabled={isView}
              value={tax}
              onChange={(e) => {
                setTax(e.target.value);
                handleTotalChange(e);
              }}
              defaultValue={row.orderItemTax}
              onKeyPress={(e) => isNumber(e, true)}
            />
          ) : column.field === "orderItemTotal" ? (
            <FormInput
              name={"orderItemTotal" + row.id}
              isRequired
              value={total}
              onChange={(e) => {
                if (onChange)
                  onChange(row.id, parseFloat(e.target.value || "0"));
                setTotal(e.target.value);
              }}
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
