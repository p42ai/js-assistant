import { asStructuredError } from "@p42/engine";

export function catchError<T>(f: () => T, errorType: string): T {
  try {
    return f();
  } catch (ex) {
    throw asStructuredError(ex, errorType);
  }
}

export async function catchErrorAsync<T>(
  f: () => T,
  errorType: string
): Promise<T> {
  try {
    return await f();
  } catch (ex) {
    throw asStructuredError(ex, errorType);
  }
}
