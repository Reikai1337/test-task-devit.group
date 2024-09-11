import { useCallback, useState } from "react";
import { Header } from "./Header";
import { sliceArrayIntoChunks } from "utils/array";
import { getMockedData, MockedDataResponse } from "api";
import { sleep } from "utils/debounce";
import { DataList } from "./DataList";
import s from "./Panel.module.scss";

const REQUEST_COUNT = 1000;
const REQUEST_MAP = Array.from(Array(REQUEST_COUNT).keys());

export const Panel = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MockedDataResponse[]>([]);

  const handleSubmit = useCallback(async (limit: number) => {
    setData([]);
    setLoading(true);

    const chunks = sliceArrayIntoChunks(REQUEST_MAP, limit);

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (index) => {
          const res = await getMockedData(index);
          setData((prev) => [...prev, res]);
        })
      );
      await sleep(1000);
    }

    setLoading(false);
  }, []);

  return (
    <div className={s.container}>
      <Header loading={loading} onSubmit={handleSubmit} />
      <DataList data={data} />
    </div>
  );
};
