"use client";
import React, { useState } from "react";
import Search from "../common/Search";
import useDebounce from "@/hooks/useDebounce";
import { Spinner, Tooltip } from "@heroui/react";
import List from "../common/List";
import EmptyRecords from "../common/EmptyRecords";
import Link from "next/link";

const MoreConnections = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce<string>(query, 500);
  const isFetching = false;
  return (
    <>
      <Search placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
      {isFetching ? (
        <Spinner size="lg" />
      ) : (
        <div className="partner-grid-view">
          <List
            items={[...Array(1)]}
            listEmptyComponent={
              <div style={{ width: "calc(100vw - 348px)" }}>
                <EmptyRecords />
              </div>
            }
            renderItem={(result) => (
              <div>
                <Tooltip
                  content="J&T Express - Courier"
                  showArrow
                  delay={500}
                  placement="bottom"
                  radius="sm"
                  size="sm"
                >
                  <Link href={`/shipping-partners/jandt-express`}>
                    <div className="inline-block relative cursor-pointer rounded overflow-hidden">
                      <img
                        width={105}
                        height={105}
                        className="block object-contain cursor-pointer partner-img"
                        src="https://storage.googleapis.com/tryoto-public/delivery-logo/jandt.png"
                      />
                    </div>
                  </Link>
                </Tooltip>
              </div>
            )}
          />
        </div>
      )}
    </>
  );
};

export default MoreConnections;
