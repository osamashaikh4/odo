import React from "react";
import AutoCompleteMulti from "./AutoCompleteMulti";

interface FilterListProps {
  column: string;
  entity: string;
}

const FilterList = ({ column, entity }: FilterListProps) => {
  return (
    <AutoCompleteMulti
      items={[]}
      selectedKeys={[]}
      onSelectionChange={console.log}
    />
  );
};

export default FilterList;
