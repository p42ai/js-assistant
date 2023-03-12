import { Range } from "../../util/text/Range";
import { createParseAndAugmentFunction } from "../createParseAndAugmentFunction";
import { CommentAugmentation } from "./CommentAugmentation";

const parseAndAugment = createParseAndAugmentFunction([CommentAugmentation]);

describe("CommentAugmentation", () => {
  it("should parse comments 1", async () => {
    const { sourceFile, context } = await parseAndAugment(`
// 1
/* 2 */
{
  const a = 3; // 3
  /* 4 */
  f();
}
// 5
`);

    expect(CommentAugmentation.getValue(sourceFile, context)!.comments).toEqual(
      [
        new Range(1, 5),
        new Range(6, 13),
        new Range(31, 35),
        new Range(38, 45),
        new Range(55, 59),
      ]
    );
  });

  it("should parse comments 2", async () => {
    const { sourceFile, context } = await parseAndAugment(`
"a" /* 1 */ + /* 2 */ "b";
`);

    expect(CommentAugmentation.getValue(sourceFile, context)!.comments).toEqual(
      [new Range(5, 12), new Range(15, 22)]
    );
  });

  it("should handle file with whitespace and no comments", async () => {
    const { sourceFile, context } = await createParseAndAugmentFunction(
      [CommentAugmentation],
      "test.js"
    )(
      `
let a = "3";
console.log(a);
`
    );

    expect(CommentAugmentation.getValue(sourceFile, context)!.comments).toEqual(
      []
    );
  });

  it("should handle file with whitespace and no comments in vue file (regression)", async () => {
    const { sourceFile, context } = await createParseAndAugmentFunction(
      [CommentAugmentation],
      "test.vue"
    )(
      `
<script>
let a = "3";
console.log(a);
</script>
`
    );

    expect(CommentAugmentation.getValue(sourceFile, context)!.comments).toEqual(
      []
    );
  });
});
