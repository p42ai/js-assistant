export const hasExactlyOneElement = (
  list: { length: number } | undefined
): boolean => list?.length === 1;
