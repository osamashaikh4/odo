import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { RxCross2 } from "react-icons/rx";
import {
  Product,
  useAddProductMutation,
  useProductQuery,
  useUpdateProductMutation,
} from "@/services/queries/product";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import { isNumber } from "@/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { GrDocumentUpload } from "react-icons/gr";

interface ProductModalProps {
  data?: Product;
  isView?: boolean;
  onClose: () => void;
}

const ProductModal = ({ data, isView, onClose }: ProductModalProps) => {
  const queryClient = useQueryClient();
  const fileInput = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: product, isFetching } = useProductQuery(data?.productID ?? "", {
    enabled: Boolean(data?.productID),
  });

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    onClose();
  };

  const addProduct = useAddProductMutation({
    onSuccess,
  });

  const updateProduct = useUpdateProductMutation({ onSuccess });

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

    if (file) {
      // values.productImage = '';
    } else {
      values.productImage = null;
    }

    const fin = {
      ...values,
      productPrice: parseFloat(values.productPrice),
      productTax: values.productTax ? parseFloat(values.productTax) : null,
    };

    if (data?.productID) {
      updateProduct.mutate({ ...fin, productID: data.productID });
    } else {
      addProduct.mutate(fin);
    }
  };
  console.log(file);
  return (
    <Modal
      isOpen={isOpen}
      shouldBlockScroll
      radius="sm"
      isDismissable={false}
      onOpenChange={handleClose}
      closeButton={<RxCross2 fontSize="2.5rem" color="#171717" />}
      className="max-h-[calc(100%_-_20rem)] h-full max-w-[65rem]"
      classNames={{ backdrop: "modal-backdrop" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isView ? "View" : data ? "Edit" : "Add"} Product
            </ModalHeader>
            <ModalBody className="px-1 overflow-auto">
              {data?.productID && isFetching ? (
                <div
                  className="absolute h-full w-full flex items-center justify-center z-20"
                  style={{ backdropFilter: "blur(1px)" }}
                >
                  <Spinner size="lg" />
                </div>
              ) : (
                <Form onSubmit={onSubmit} validationBehavior="native">
                  <div className="p-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <FormInput
                      className="w-full"
                      label="Product Name"
                      isRequired
                      isDisabled={isView}
                      defaultValue={product?.productName}
                      name="productName"
                      labelPlacement="outside"
                      placeholder=" "
                    />
                    <FormInput
                      className="w-full"
                      label="SKU"
                      isRequired
                      isDisabled={isView}
                      defaultValue={product?.productSku}
                      name="productSku"
                      labelPlacement="outside"
                      placeholder=" "
                    />
                    <div className="flex items-baseline">
                      <FormInput
                        className="w-full"
                        label="Price"
                        isRequired
                        isDisabled={isView}
                        onKeyPress={(e) => isNumber(e, true)}
                        name="productPrice"
                        classNames={{
                          inputWrapper: "rounded-br-none rounded-tr-none",
                        }}
                        defaultValue={product?.productPrice as any}
                        labelPlacement="outside"
                        placeholder=" "
                      />
                      <FormSelect
                        isDisabled={isView}
                        name="productCurrency"
                        className="max-w-[5rem]"
                        classNames={{
                          trigger:
                            "rounded-tl-none rounded-bl-none border-l-0 shadow-none",
                        }}
                        options={["SAR"].map((c) => ({ label: c, value: c }))}
                        variant="bordered"
                        defaultSelectedKeys={["SAR"]}
                      />
                    </div>
                    <div className="flex items-baseline">
                      <FormInput
                        className="w-full"
                        label="Tax Amount"
                        isDisabled={isView}
                        onKeyPress={(e) => isNumber(e, true)}
                        name="productTax"
                        defaultValue={product?.productTax as any}
                        classNames={{
                          inputWrapper: "rounded-br-none rounded-tr-none",
                        }}
                        labelPlacement="outside"
                        placeholder=" "
                      />
                      <FormSelect
                        isDisabled={isView}
                        name="productCurrency"
                        className="max-w-[5rem]"
                        classNames={{
                          trigger:
                            "rounded-tl-none rounded-bl-none border-l-0 shadow-none",
                        }}
                        options={["SAR"].map((c) => ({ label: c, value: c }))}
                        variant="bordered"
                        defaultSelectedKeys={["SAR"]}
                      />
                    </div>
                    <FormInput
                      className="w-full"
                      label="Description"
                      isDisabled={isView}
                      defaultValue={product?.productDescription}
                      name="productDescription"
                      labelPlacement="outside"
                      placeholder=" "
                    />
                    <div className="flex items-end relative">
                      <FormInput
                        className="w-full"
                        label="Image"
                        ref={fileInput}
                        isDisabled={isView}
                        isReadOnly
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) setFile(e.target.files[0]);
                        }}
                        accept="image/png, image/jpeg, image/jpg"
                        multiple={false}
                        defaultValue="Select File"
                        name="productImage"
                        labelPlacement="outside"
                        placeholder=" "
                      />
                      <Button
                        variant="bordered"
                        radius="sm"
                        isDisabled={isView}
                        className="border-small absolute right-0"
                        startContent={<GrDocumentUpload className="h-4 w-4" />}
                        onPress={() => {
                          if (fileInput.current) fileInput.current.click();
                        }}
                      >
                        Upload
                      </Button>
                    </div>
                    <FormInput
                      className="w-full"
                      label="Barcode"
                      isDisabled={isView}
                      defaultValue={product?.productBarcode}
                      name="productBarcode"
                      labelPlacement="outside"
                      placeholder=" "
                    />
                    <FormInput
                      className="w-full"
                      label="Category"
                      isDisabled={isView}
                      defaultValue={product?.productCategory}
                      name="productCategory"
                      labelPlacement="outside"
                      placeholder=" "
                    />
                  </div>
                  <button
                    ref={submitButtonRef}
                    type="submit"
                    className="invisible"
                  />
                </Form>
              )}
            </ModalBody>
            <ModalFooter>
              {!isView && (
                <>
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
                    radius="sm"
                    isLoading={addProduct.isPending || updateProduct.isPending}
                    onPress={() => {
                      if (submitButtonRef.current)
                        submitButtonRef.current.click();
                    }}
                  >
                    {data?.productID ? "Save" : "Add"}
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
