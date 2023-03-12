export type PerformanceLogLevel = "overview" | "detail";

export interface PerformanceRecorder {
  run<T>(label: string, level: PerformanceLogLevel, f: () => T): T;
  runAsync<T>(
    label: string,
    level: PerformanceLogLevel,
    f: () => Promise<T>
  ): Promise<T>;
}

export const NullPerformanceRecorder: PerformanceRecorder = Object.freeze({
  run<T>(label: string, level: PerformanceLogLevel, f: () => T) {
    return f();
  },
  runAsync<T>(label: string, level: PerformanceLogLevel, f: () => Promise<T>) {
    return f();
  },
});
