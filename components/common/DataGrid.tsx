"use client";
import React from "react";
import Table, { TableProps } from "./Table";
import TableFooter from "./TableFooter";
import { cn } from "@/helpers";

interface DataGridProps extends Omit<TableProps, "limit"> {
  count: number;
  containerClassName?: string;
  showFooter?: boolean;
  toolbar?: React.ReactNode;
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
  toolbar,
  showFooter = true,
  selection,
  onSelectionChange,
  onSelectAll,
}: DataGridProps) => {
  return (
    <div
      className={cn(
        "rounded border border-gray-200 overflow-hidden p-2 bg-white",
        classNames?.container ?? ""
      )}
    >
      {toolbar}
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
        onSelectAll={onSelectAll}
        onSelectionChange={onSelectionChange}
        selection={selection}
        outerAction={outerAction}
        onFilter={onFilter}
      />
      {showFooter && (
        <TableFooter
          total={Math.ceil(count / filters.limit)}
          initialPage={filters.limit / filters.offset + 1}
        />
      )}
    </div>
  );
};

export default DataGrid;
