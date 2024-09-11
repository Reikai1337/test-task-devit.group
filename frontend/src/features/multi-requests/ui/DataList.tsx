import { FC, memo } from "react";
import { MockedDataResponse } from "api";
import { VirtualScroll } from "components";
import cn from "classnames";
import s from "./DataList.module.scss";

type Props = {
  data: MockedDataResponse[];
};

export const DataList: FC<Props> = ({ data }) => {
  return (
    <div className={s.container}>
      <div className={s.head}>
        <p>Index</p>
        <p>Status</p>
      </div>

      {!data.length ? (
        <p className={s.emptyStatePlaceholder}>No rows</p>
      ) : (
        <VirtualScroll<MockedDataResponse>
          containerHeight="300px"
          items={data}
          rowHeight={40}
          totalItems={data.length}
          visibleItemsLength={30}
        >
          {(items) => items.map((item, i) => <Item item={item} key={i} />)}
        </VirtualScroll>
      )}
    </div>
  );
};

type ItemProps = {
  item: MockedDataResponse;
};

export const Item = memo<ItemProps>(({ item }) => {
  return (
    <p className={s.listItem}>
      <span>{item.data?.index ?? "-"}</span>
      <span
        className={cn(s.status, {
          [s.error]: item.hasError,
          [s.success]: !item.hasError,
        })}
      >
        {item.status}
      </span>
    </p>
  );
});
