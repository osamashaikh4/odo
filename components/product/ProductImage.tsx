import React, { useState } from "react";
import ProductImageModal from "./ProductImageModal";
import { cn } from "@/helpers";

interface ProductImageProps {
  image?: string;
  containerClassName?: string;
  altText?: string;
  modalClassName?: string;
  modalImageClassName?: string;
}

const ProductImage = ({
  image,
  altText,
  containerClassName,
  modalClassName,
  modalImageClassName,
}: ProductImageProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className={cn(
          "cursor-pointer rounded h-8 w-8 overflow-hidden relative inline-block product-image",
          containerClassName
        )}
        onClick={() => {
          if (image) {
            setShowModal(true);
          }
        }}
      >
        <img
          className="object-contain block h-full w-full"
          src={
            !image
              ? "/assets/icons/empty-product.jpg"
              : image.includes("/assets/products")
              ? `${process.env.NEXT_PUBLIC_BASE_URL}${image}`
              : image
          }
          alt={altText}
        />
      </div>
      {showModal && image && (
        <ProductImageModal
          modalClassName={modalClassName}
          image={image}
          title={altText}
          modalImageClassName={modalImageClassName}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductImage;
