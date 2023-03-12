export type FunctionElement = {
  id: string;
  name: string;
  start: number;
  end: number;
  nameStart: number;
  nameEnd: number;
  metrics: {
    size: number;
  };
};
