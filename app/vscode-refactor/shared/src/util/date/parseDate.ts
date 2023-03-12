export const parseDate = (value: unknown): Date | null => {
  if (typeof value !== "string") {
    return null;
  }
  try {
    return new Date(Date.parse(value));
  } catch (error) {
    return null;
  }
};
