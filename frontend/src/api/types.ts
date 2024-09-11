export type Response<T> =
  | {
      data: T;
      error?: string;
      status: 200;
      hasError: false;
    }
  | { data: null; error: string; status: 429; hasError: true };
