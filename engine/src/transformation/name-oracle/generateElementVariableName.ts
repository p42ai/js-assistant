import * as _ from "lodash";
import { convertToSingular } from "../../util/text/convertToSingular";
import { generateNameWithIncreasingNumber } from "./generateNameWithIncreasingNumber";
import { NameOracle } from "./NameOracle";

const containerSuffixToElementSuffix = new Map<string, string>();
containerSuffixToElementSuffix.set("Array", "Element");
containerSuffixToElementSuffix.set("List", "Item");
containerSuffixToElementSuffix.set("Set", "Item");
containerSuffixToElementSuffix.set("Collection", "Item");
containerSuffixToElementSuffix.set("Children", "Child");

export const generateElementVariableName = (
  collectionName: string | undefined
): NameOracle => {
  if (collectionName === undefined) {
    return generateNameWithIncreasingNumber("element");
  }

  const singularName = convertToSingular({
    pluralWord: collectionName,
    noSpaces: true,
  });

  if (singularName == null) {
    for (const entry of containerSuffixToElementSuffix.entries()) {
      if (collectionName.endsWith(entry[0])) {
        return generateNameWithIncreasingNumber(
          `${collectionName.substring(
            0,
            collectionName.length - entry[0].length
          )}${entry[1]}`
        );
      }
    }

    return generateNameWithIncreasingNumber("element");
  }

  // prevent elementElement
  if (singularName === "element") {
    return generateNameWithIncreasingNumber(singularName);
  }

  return generateNameWithIncreasingNumber(
    singularName,
    `${singularName}Element`
  );
};
