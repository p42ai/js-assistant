// TODO rename to OptionalPartialRecord
export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T | undefined;
};

// TODO rename to PartialRecord
export type HardPartialRecord<K extends keyof any, T> = {
  [P in K]: T;
};
