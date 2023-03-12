import * as _ from "lodash";

export interface DateTime {
  now(): number;
  setTimeout(f: () => void, delay: number): number;
}

export class TestDateTime implements DateTime {
  private timeoutIdCounter = 0;

  private timeouts: Array<{
    id: number;
    time: number;
    f: () => void;
  }> = [];

  constructor(private nowValue: number = 0) {}

  now(): number {
    return this.nowValue;
  }

  increment(milliseconds: number) {
    this.nowValue += milliseconds;

    // invoke all function that have passed (in correct order)
    _.sortBy(
      this.timeouts.filter((timeout) => timeout.time <= this.nowValue),
      (timeout: any) => timeout.time
    )
      .map((timeout) => timeout.f)
      .forEach((f) => f());

    // remove passed timeouts
    this.timeouts = this.timeouts.filter(
      (timeout) => timeout.time > this.nowValue
    );
  }

  setTimeout(f: () => void, delay: number) {
    const id = this.timeoutIdCounter++;
    this.timeouts.push({
      id,
      time: this.nowValue + delay,
      f,
    });
    return id;
  }
}

export const DefaultDateTime: DateTime = Object.freeze({
  now() {
    return Date.now();
  },
  setTimeout(callback: (...args: any[]) => void, timeoutInMs: number): number {
    return +setTimeout(callback, timeoutInMs);
  },
});
