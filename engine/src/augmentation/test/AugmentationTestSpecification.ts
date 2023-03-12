export type AugmentationTestSpecification = {
  input: string;
  expectedAugmentations: Record<
    string,
    {
      match: boolean;
      captures: Record<string, any> | undefined;
      data: Record<string, any> | undefined;
    }
  >;
};
