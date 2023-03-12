import { convertToSingular } from "./convertToSingular";

const testConvertToSingular = (
  pluralWord: string,
  expectedSingular: string | undefined,
  noSpaces = false
) => {
  it(`should convert '${pluralWord}' into '${expectedSingular}'`, () => {
    const singular = convertToSingular({ pluralWord, noSpaces });

    if (expectedSingular === undefined) {
      expect(singular).toBeUndefined();
    } else {
      expect(singular).toEqual(expectedSingular);
    }
  });
};

// https://www.grammarly.com/blog/plural-nouns/
describe("convertToSingular", () => {
  describe("To make regular nouns plural, add ‑s to the end.", () => {
    testConvertToSingular("cats", "cat");
    testConvertToSingular("names", "name");
    testConvertToSingular("chefs", "chef");
  });

  describe("If the singular noun ends in ‑s, -ss, -sh, -ch, -x, or -z, add ‑es to the end to make it plural.", () => {
    testConvertToSingular("prefixes", "prefix");
    testConvertToSingular("touches", "touch");
    testConvertToSingular("buses", "bus");
    testConvertToSingular("washes", "wash");
    testConvertToSingular("buzzes", "buzz");
  });

  describe("If a singular noun ends in ‑y and the letter before the -y is a consonant, change the ending to ‑ies to make the noun plural.", () => {
    testConvertToSingular("cities", "city");
  });

  describe("If the singular noun ends in -y and the letter before the -y is a vowel, simply add an -s to make it plural.", () => {
    testConvertToSingular("boys", "boy");
  });

  describe("If the singular noun ends in ‑o, add ‑es to make it plural.", () => {
    testConvertToSingular("potatoes", "potato");
    testConvertToSingular("photos", "photo");
  });

  describe("If the singular noun ends in ‑on, the plural ending is ‑a.", () => {
    testConvertToSingular("criteria", "criterion");
  });

  testConvertToSingular("res", undefined);
  testConvertToSingular("data", "data element");
  testConvertToSingular("data", "dataElement", true);
});
