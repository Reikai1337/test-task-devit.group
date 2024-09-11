import { Response } from "./types";

export const overfetch = async <T>(
  baseUrl: string,
  searchParams?: Record<string, string>
): Promise<Response<T>> => {
  const url = new URL(baseUrl);
  if (searchParams) {
    url.search = new URLSearchParams(searchParams).toString();
  }

  try {
    const res = (await fetch(url).then((response) => response.json())) as T;

    return {
      data: res,
      hasError: false,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      hasError: true,
      status: 429,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
