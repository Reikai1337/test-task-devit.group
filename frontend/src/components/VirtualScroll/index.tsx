import { ReactNode, UIEvent, useCallback, useMemo, useState } from "react";

type Props<T> = {
  rowHeight: number;
  totalItems: number;
  items: T[];
  visibleItemsLength: number;
  containerHeight: string;
  children: (item: T[]) => ReactNode;
};

export const VirtualScroll = <T,>({
  rowHeight,
  totalItems,
  items,
  visibleItemsLength,
  containerHeight,
  children,
}: Props<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = rowHeight * totalItems;
  const startNodeElem = Math.ceil(scrollTop / rowHeight);
  const visibleItems = useMemo(
    () => items.slice(startNodeElem, startNodeElem + visibleItemsLength),
    [items, startNodeElem, visibleItemsLength]
  );
  const offsetY = startNodeElem * rowHeight;

  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
    []
  );

  return (
    <div
      style={{
        height: containerHeight,
        overflow: "auto",
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {children(visibleItems)}
        </div>
      </div>
    </div>
  );
};
