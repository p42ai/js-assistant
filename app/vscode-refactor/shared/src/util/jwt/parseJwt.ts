import { decodeBase64 } from "../text/decodeBase64";

export const parseJwt = (jwt: string): Record<string, unknown> | null => {
  const parts = jwt.split(".");

  if (parts.length !== 3) {
    return null;
  }

  // TODO verify that JWT is correctly signed
  const [meta, payload, signature] = parts;

  try {
    // TODO might not be Record<string, unknown>
    return JSON.parse(decodeBase64(payload)) as Record<string, unknown>;
  } catch (error) {
    return null;
  }
};
