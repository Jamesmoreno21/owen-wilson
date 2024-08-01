"use client";

import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export const ElementsList = ({ elements,title }: { elements: string[]; title: string }) => {
  const [order, setOrder] = useState<"asc" | "desc" | undefined>(undefined);
  const [sortedElements, setSortedElements] = useState(elements);
  useEffect(() => {
    if (order === "asc") {
      setSortedElements(elements.sort());
    } else if (order === "desc") {
      setSortedElements(elements.reverse());
    } else {
      setSortedElements(elements);
    }
  }, [elements, order]);

  const handleClick = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full gap-4 ">
        <h1 className="text-4xl font-bold">{title}</h1>
        <button
          onClick={handleClick}
          className="p-2 bg-blue-500 text-white rounded-md flex items-center justify-center gap-2"
        >
          Sort by name
          {order === "asc" ? (
            <BarsArrowDownIcon className="w-6 h-6 mr-2" />
          ) : (
            <BarsArrowUpIcon className="w-6 h-6 mr-2" />
          )}
        </button>
      </div>
      <div className="flex flex-col divide-y divide-gray-300">
        {sortedElements.map((movie, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between p-4"
          >
            <h1 className="text-lg">
              {index + 1} - {movie}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
};
