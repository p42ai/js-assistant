import { parseMarkdownTestSpecification } from "../../test/parseMarkdownTestSpecification";
import { AugmentationTestSpecification } from "./AugmentationTestSpecification";

export function parseAugmentationTestSpecification(
  content: string
): AugmentationTestSpecification {
  const sectionContents = parseMarkdownTestSpecification(content, [
    "input",
    "expected augmentations",
  ]);

  return {
    input: sectionContents.get("input")!,
    expectedAugmentations: JSON.parse(
      sectionContents.get("expected augmentations")!
    ),
  };
}
