"use client";
import React from "react";
import Table, { TableProps } from "./Table";
import TableFooter from "./TableFooter";
import { cn } from "@/helpers";

interface DataGridProps extends Omit<TableProps, "limit"> {
  count: number;
  containerClassName?: string;
  showFooter?: boolean;
}

const DataGrid = ({
  columns,
  rows,
  isLoading,
  entity,
  filters,
  count,
  onFilter,
  options,
  onAction,
  outerAction,
  classNames,
  showFooter = true,
}: DataGridProps) => {
  return (
    <div
      className={cn(
        "rounded border border-gray-200 overflow-hidden p-2",
        classNames?.container ?? ""
      )}
    >
      <Table
        options={options}
        columns={columns}
        isLoading={isLoading}
        classNames={classNames}
        limit={filters.limit}
        entity={entity}
        filters={filters}
        onAction={onAction}
        rows={rows}
        outerAction={outerAction}
        onFilter={onFilter}
      />
      {showFooter && (
        <TableFooter
          total={count}
          initialPage={filters.limit / filters.offset + 1}
        />
      )}
    </div>
  );
};

export default DataGrid;
