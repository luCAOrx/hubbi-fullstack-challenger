import { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useCreateQueryString(searchParams: ReadonlyURLSearchParams) {
  return useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
}
