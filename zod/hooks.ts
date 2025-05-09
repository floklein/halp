import { AxiosError } from "axios";
import { z, ZodSchema } from "zod";

export function useZodErrors<S extends ZodSchema>(
  error: Error | null,
): z.inferFormattedError<S> | null {
  if (!(error instanceof AxiosError)) {
    return null;
  }
  return error.response?.data ?? null;
}
