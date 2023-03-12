import { Binding } from "../../augmentation/scope/Binding";

export const isBindingDeclaredOnce = (binding: Binding): boolean =>
  !binding.isDeclaredMultipleTimes();
