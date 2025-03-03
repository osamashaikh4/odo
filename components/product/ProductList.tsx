"use client";
import React, { useState } from "react";
import DataGrid from "../common/DataGrid";
import SectionHeader from "../shipments/SectionHeader";
import { Product, useProductsQuery } from "@/services/queries/product";
import { Button } from "@heroui/react";
import { OrderIcons } from "../order/OrderListConfig";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { NumericFormat } from "react-number-format";
import { Column } from "../common/Table";
import { RiBarcodeLine } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import ProductModal from "./ProductModal";
import BarcodeGeneratorModal from "./BarcodeGeneratorModal";

interface ProductListProps {
  searchParams?: { [key: string]: any };
}

const columns: Column[] = [
  { field: "productName", headerName: "Product Name", type: "text" },
  {
    field: "productSku",
    headerName: "SKU",
    type: "text",
  },
  {
    field: "productBarcode",
    headerName: "Barcode",
    type: "text",
  },
  {
    field: "productPrice",
    headerName: "Price",
    render: ({ value, row }) => (
      <NumericFormat
        value={value}
        thousandSeparator
        suffix={` ${row.productCurrency}`}
        displayType="text"
      />
    ),
    type: "number",
  },
];

const menuOptions = [
  {
    label: "Edit Product",
    value: "edit-product",
    icon: OrderIcons.edit,
  },
  {
    label: "View Product",
    value: "view-product",
    icon: OrderIcons.view,
  },
  {
    label: "Barcode Generator",
    value: "barcode-generator",
    icon: <RiBarcodeLine size={18} className="text-gray-600" />,
  },
];

const ProductList = ({ searchParams }: ProductListProps) => {
  const router = useRouter();
  const [productModal, setProductModal] = useState<
    (Product & { isView?: boolean }) | null
  >(null);
  const [barcodeGenerator, setBarcodeGenerator] = useState<Product | null>(
    null
  );
  const [selection, setSelection] = useState<Product[]>([]);
  const filters = {
    limit: 10,
    offset: 0,
    ...searchParams,
  };

  const { data = { results: [], count: 0 }, isFetching } =
    useProductsQuery(filters);

  const handleAction = (action: string, data: any) => {
    if (action === "add-product") {
      setProductModal({} as any);
    } else if (action === "view-product") {
      setProductModal({ ...data, isView: true });
    } else if (action === "edit-product") {
      setProductModal(data);
    } else if (action === "barcode-generator") {
      setBarcodeGenerator(data);
    }
  };

  const handleSelection = (row: Product) => {
    const tmp = [...selection];
    const index = tmp.findIndex((r) => r.productID == row.productID);

    if (index >= 0) {
      tmp.splice(index, 1);
    } else {
      tmp.push(row);
    }
    setSelection(tmp);
  };

  return (
    <>
      <SectionHeader
        title="Products"
        icon="shipment"
        rightAction={
          <Button
            radius="sm"
            color="primary"
            onPress={() => handleAction("add-product", {})}
            startContent={<BsPlus className="h-6 w-6" />}
          >
            Add Product
          </Button>
        }
      />
      <DataGrid
        onSelectionChange={handleSelection}
        onSelectAll={setSelection}
        selection={selection.map((s) => s.productID)}
        toolbar={
          <div className="pb-2 pr-1 flex items-center justify-between">
            <div className="flex items-center gap-5"></div>
            <Button
              variant="bordered"
              radius="sm"
              className="min-w-10 border-small"
            >
              Export Data
            </Button>
          </div>
        }
        onAction={handleAction}
        filters={filters}
        count={data.count}
        rows={data.results}
        isLoading={isFetching}
        options={menuOptions}
        columns={columns}
        entity="orders"
        onFilter={(f) => {
          router.push(
            `/products?${queryString.stringify({ ...filters, ...f })}`
          );
        }}
      />
      {barcodeGenerator && (
        <BarcodeGeneratorModal
          product={barcodeGenerator}
          onClose={() => setBarcodeGenerator(null)}
        />
      )}
      {productModal && (
        <ProductModal
          isView={productModal.isView}
          data={productModal}
          onClose={() => setProductModal(null)}
        />
      )}
    </>
  );
};

export default ProductList;
