import React from "react";
import AutoCompleteMulti from "./AutoCompleteMulti";
import { useEntityFiltersQuery } from "@/services/queries/common";
import { OrderStateMap, PaymentMethodsMap } from "@/helpers";

interface FilterListProps {
  column: string;
  entity: string;
  filters: any;
  onFilter: (filter: any) => void;
}

const DefaultValue: { [key: string]: any } = {
  paymentMethod: PaymentMethodsMap,
  orderState: OrderStateMap,
};

const FilterList = ({ column, entity, filters, onFilter }: FilterListProps) => {
  const { data = [] } = useEntityFiltersQuery({ entity, column });
  return (
    <AutoCompleteMulti
      items={data.map((d) => ({
        label:
          DefaultValue[column] && DefaultValue[column][d]
            ? DefaultValue[column][d]
            : d,
        value: d,
      }))}
      selectedKeys={
        Array.isArray(filters[column])
          ? filters[column]
          : typeof filters[column] === "string"
          ? [filters[column]]
          : []
      }
      onSelectionChange={(s) => {
        const sel = Array.isArray(filters[column])
          ? filters[column]
          : typeof filters[column] === "string"
          ? [filters[column]]
          : [];

        if ((sel.length > 0 && s.length === 0) || s.length > 0)
          onFilter({ [column]: s });
      }}
    />
  );
};

export default FilterList;
