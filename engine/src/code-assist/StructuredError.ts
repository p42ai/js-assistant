// TODO defined return type
export function asStructuredError(ex: any, errorType: string) {
  return {
    message: ex.stack ?? ex.message ?? ex,
    type: ex.type || errorType,
    stack: ex.stack,
  };
}
