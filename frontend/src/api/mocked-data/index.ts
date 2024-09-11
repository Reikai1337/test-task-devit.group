import { overfetch } from "../lib";
import { MOCKED_DATA_URL } from "../routes";
import { MockedData } from "./types";

export const getMockedData = (index: number) => {
  return overfetch<MockedData>(MOCKED_DATA_URL, { index: index.toString() });
};
