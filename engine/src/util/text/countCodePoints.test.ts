import { countCodePoints } from "./countCodePoints";

function testCountCodePoints(text: string, expectedCodePointCount: number) {
  it(`${text} should have ${expectedCodePointCount} code points`, () => {
    expect(countCodePoints(text)).toStrictEqual(expectedCodePointCount);
  });
}

describe("countCodePoints", () => {
  testCountCodePoints("1", 1);
  testCountCodePoints("22", 2);
  testCountCodePoints("😯😯😯😯", 4);
  testCountCodePoints("𠮷𠮷𠮷𠮷", 4);
  testCountCodePoints("🇨🇦", 2);
});
