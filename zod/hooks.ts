import { AxiosError } from "axios";
import { z, ZodSchema } from "zod";

export function useZodErrors<S extends ZodSchema>(
  error: Error | null,
): z.inferFormattedError<S> | null {
  if (!(error instanceof AxiosError)) {
    return null;
  }
  console.log("error", error);
  return error.response?.data ?? null;
}
