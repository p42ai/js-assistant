export type SelectOptionRequest = {
  title: string;
  options: Array<{
    label: string;
    description?: string | undefined;
  }>;
  selectedOption?: string | undefined;
};

export interface InteractiveInput {
  selectOption(request: SelectOptionRequest): Promise<string | undefined>;
}
