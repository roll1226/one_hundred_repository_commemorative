import { UseAsyncReturn, useAsync } from "./useAsync";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

type UseFetch = <T>(
  url: string,
  options?: RequestInit,
  dependencies?: unknown[]
) => UseAsyncReturn<T>;

export const useFetch: UseFetch = (url, options = {}, dependencies = []) => {
  return useAsync(async () => {
    const res = await fetch(url, { ...DEFAULT_OPTIONS, ...options });
    if (res.ok) return res.json();
    const json = await res.json();
    return await Promise.reject(json);
  }, dependencies);
};
