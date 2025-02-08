import React from "react";

interface ListProps<T> {
  items: T[];
  listEmptyComponent?: React.ReactNode;
  renderItem: (item: T, index: number) => React.ReactNode;
}

const List = <T,>({ items, renderItem, listEmptyComponent }: ListProps<T>) => {
  return items.length > 0 ? items.map(renderItem) : listEmptyComponent;
};

export default List;
