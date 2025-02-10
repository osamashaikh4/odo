"use client";
import React from "react";
import Table, { TableProps } from "./Table";
import TableFooter from "./TableFooter";

interface DataGridProps extends TableProps {}

const DataGrid = ({ columns, rows, isLoading, entity }: DataGridProps) => {
  return (
    <div className="rounded border border-gray-200 overflow-hidden p-2">
      <Table
        columns={columns}
        isLoading={isLoading}
        limit={10}
        entity={entity}
        onAction={console.log}
        rows={rows}
      />
      <TableFooter />
    </div>
  );
};

export default DataGrid;
