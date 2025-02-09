"use client";
import React from "react";
import Table from "./Table";

interface DataGridProps {
  isLoading?: boolean;
}

const DataGrid = ({ isLoading }: DataGridProps) => {
  return (
    <div className="rounded border border-gray-200 overflow-hidden p-2">
      <Table
        columns={[
          { field: "id", headerName: "ID" },
          { field: "title", headerName: "Title" },
        ]}
        isLoading={isLoading}
        limit={10}
        onAction={console.log}
        rows={[
          { id: 0, title: "Example" },
          { id: 1, title: "Demo" },
        ]}
      />
    </div>
  );
};

export default DataGrid;
