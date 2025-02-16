import { cn } from "@/helpers";
import React from "react";
import Menu, { MenuProps } from "./Menu";
import { Button, DateRangePicker } from "@heroui/react";
import { LuEllipsis } from "react-icons/lu";
import FilterList from "./FilterList";
import FilterInput from "./FilterInput";
import EmptyRecords from "./EmptyRecords";

export type Column = {
  align?: "center" | "left" | "right";
  field: string;
  width?: string | number;
  headerName: string;
  type?: string;
  render?: (value: any, row: any) => React.ReactElement;
};

export interface TableProps {
  columns: Column[];
  rows: any[];
  limit: number;
  onAction: (action: string, row: any) => void;
  isLoading?: boolean;
  actions?: string[];
  entity?: string;
  filters: any;
  showEmptyMessage?: boolean;
  options?: MenuProps["options"];
  outerAction?: (row: any) => React.ReactNode;
  onFilter?: (filter: any) => void;
  classNames?: {
    container?: string;
    table?: string;
    thead?: string;
    tbody?: string;
  };
  renderRow?: (row: any, columns: Column[]) => React.ReactNode;
}

export default function Table({
  columns,
  rows,
  isLoading,
  limit,
  entity = "",
  onAction,
  filters,
  onFilter = () => {},
  options = [],
  outerAction,
  classNames,
  showEmptyMessage = true,
  renderRow,
}: TableProps) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden">
            <table
              className={cn(
                "table-fixed min-w-full divide-y divide-gray-200",
                classNames?.table ?? ""
              )}
            >
              <thead
                className={cn(
                  "bg-foreground-50 border",
                  classNames?.thead ?? ""
                )}
                id="thead"
              >
                <tr>
                  {/* <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all"
                        aria-describedby="checkbox-1"
                        type="checkbox"
                        className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                      />
                      <label className="sr-only">checkbox</label>
                    </div>
                  </th> */}
                  {columns.map((column) => (
                    <th
                      key={column.field}
                      scope="col"
                      className={cn(
                        "py-3 px-4 text-left text-sm font-medium whitespace-nowrap",
                        column.align ? `text-${column.align}` : ""
                      )}
                    >
                      <div className="flex flex-col gap-2">
                        <span>{column.headerName}</span>
                        {column.type === "text" ? (
                          <FilterInput
                            size="sm"
                            defaultValue={filters[column.field]}
                            onChange={(e) =>
                              onFilter({ [column.field]: e.target.value })
                            }
                          />
                        ) : column.type === "number" ? (
                          <div className="flex items-center gap-2">
                            <FilterInput
                              size="sm"
                              placeholder="Min"
                              defaultValue={filters[column.field + "Min"]}
                              onChange={(e) =>
                                onFilter({
                                  [column.field + "Min"]: e.target.value,
                                })
                              }
                            />
                            <FilterInput
                              size="sm"
                              placeholder="Max"
                              defaultValue={filters[column.field + "Max"]}
                              onChange={(e) =>
                                onFilter({
                                  [column.field + "Max"]: e.target.value,
                                })
                              }
                            />
                          </div>
                        ) : column.type === "dropdown" ? (
                          <div className="w-full">
                            <FilterList
                              filters={filters}
                              column={column.field}
                              entity={entity}
                              onFilter={onFilter}
                            />
                          </div>
                        ) : column.type === "date" ? (
                          <DateRangePicker
                            size="sm"
                            radius="sm"
                            classNames={{
                              inputWrapper:
                                "rounded border-small shadow-none border-borderGrey border-1 bg-white",
                            }}
                            selectorButtonPlacement="start"
                            onChange={(v: any) => {
                              if (v) {
                                onFilter({
                                  startDate: v.start.toString(),
                                  endDate: v.end.toString(),
                                });
                              } else {
                                onFilter({
                                  startDate: undefined,
                                  endDate: undefined,
                                });
                              }
                            }}
                          />
                        ) : null}
                      </div>
                    </th>
                  ))}
                  <th scope="col" className="p-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  Array.from({ length: limit }).map((_, i) => (
                    <tr key={`skeleton-${i}`} className="animate-pulse h-10">
                      {columns.map((_, ind) => (
                        <td
                          key={`skeleton-${i}-col-${ind}`}
                          className="px-4 whitespace-nowrap"
                        >
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </td>
                      ))}
                      {/* <td className="p-2 whitespace-nowrap space-x-2">
                          <div className="inline-flex space-x-2">
                            {actions.map((action) => (
                              <div
                                key={action}
                                className="h-8 w-10 bg-gray-300 rounded"
                              />
                            ))}
                          </div>
                        </td> */}
                    </tr>
                  ))
                ) : rows.length > 0 ? (
                  rows.map((row, i) =>
                    renderRow ? (
                      renderRow(row, columns)
                    ) : (
                      <tr
                        className="hover:bg-foreground-50 h-12"
                        key={`row-${i}`}
                      >
                        {columns.map((column, ind) => (
                          <td
                            className="py-1 px-4 overflow-hidden text-ellipsis text-sm text-dark"
                            key={`row-${i}-col-${ind}`}
                            style={{
                              minWidth: 45,
                              width: column.width,
                              maxWidth: column.width,
                            }}
                          >
                            {column.render ? (
                              column.render(row[column.field], row)
                            ) : (
                              <span className="overflow-hidden block text-ellipsis whitespace-nowrap">
                                {row[column.field]}
                              </span>
                            )}
                          </td>
                        ))}
                        <td className="py-1 px-4 whitespace-nowrap space-x-2 text-right">
                          {outerAction ? (
                            outerAction(row)
                          ) : (
                            <Menu
                              onAction={(a) => onAction(a, row)}
                              options={options}
                            >
                              <Button isIconOnly variant="light">
                                <LuEllipsis fontSize="1.25rem" />
                              </Button>
                            </Menu>
                          )}
                        </td>
                      </tr>
                    )
                  )
                ) : showEmptyMessage ? (
                  <tr className="hover:bg-foreground-50 h-12">
                    <td colSpan={6}>
                      <EmptyRecords />
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
