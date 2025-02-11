"use client";
import React from "react";
import Table, { TableProps } from "./Table";
import TableFooter from "./TableFooter";

interface DataGridProps extends Omit<TableProps, "limit"> {
  count: number;
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
}: DataGridProps) => {
  return (
    <div className="rounded border border-gray-200 overflow-hidden p-2">
      <Table
        options={options}
        columns={columns}
        isLoading={isLoading}
        limit={filters.limit}
        entity={entity}
        filters={filters}
        onAction={console.log}
        rows={rows}
        onFilter={onFilter}
      />
      <TableFooter
        total={count}
        initialPage={filters.limit / filters.offset + 1}
      />
    </div>
  );
};

export default DataGrid;
