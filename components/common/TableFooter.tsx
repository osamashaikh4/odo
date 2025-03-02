import React from "react";
import { cn } from "@/helpers";
import { Pagination, PaginationItemType, PaginationProps } from "@heroui/react";

interface TableFooterProps {
  total: PaginationProps["total"];
  initialPage: PaginationProps["initialPage"];
}

export const ChevronIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

const renderItem = ({
  ref,
  key,
  value,
  isActive,
  onNext,
  onPrevious,
  setPage,
  className,
}: any) => {
  if (value === PaginationItemType.NEXT) {
    return (
      <button
        key={key}
        className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
        onClick={onNext}
      >
        <ChevronIcon className="rotate-180" />
      </button>
    );
  }

  if (value === PaginationItemType.PREV) {
    return (
      <button
        key={key}
        className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
        onClick={onPrevious}
      >
        <ChevronIcon />
      </button>
    );
  }

  if (value === PaginationItemType.DOTS) {
    return (
      <button key={key} className={className}>
        ...
      </button>
    );
  }

  return (
    <button
      key={key}
      ref={ref}
      className={cn(
        className,
        isActive && "text-white bg-gradient-to-br bg-[#506efe] font-bold"
      )}
      onClick={() => setPage(value)}
    >
      {value}
    </button>
  );
};

const TableFooter = ({ total, initialPage }: TableFooterProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div></div>
      <Pagination
        disableCursorAnimation
        showControls
        className="gap-2"
        initialPage={initialPage}
        radius="full"
        renderItem={renderItem}
        total={total}
        variant="light"
      />
      <div></div>
    </div>
  );
};

export default TableFooter;
