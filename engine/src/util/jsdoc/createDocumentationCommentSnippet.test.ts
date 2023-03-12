import { createDocumentationCommentSnippet } from "./createDocumentationCommentSnippet";
import { DocumentationCommentContent } from "./DocumentationCommentContent";

function testCreateDocumentationCommentSnippet(
  content: DocumentationCommentContent,
  expectedOutput: string
) {
  expect(createDocumentationCommentSnippet(content)).toEqual(expectedOutput);
}

describe("createDocumentationCommentSnippet", () => {
  it("should print multiple parameters and return", () => {
    testCreateDocumentationCommentSnippet(
      {
        description: "description",
        params: [
          { name: "param1", type: null, description: "description1" },
          { name: "param2", type: "type", description: "description2" },
        ],
        returns: {
          description: "return value",
          type: null,
        },
      },
      `/**
 * \${1:description}
 *
 * @param param1 - \${2:description1}
 * @param {\${3:type}} param2 - \${4:description2}
 *
 * @returns \${5:return value}
 */
`
    );
  });

  it("should print return with type", () => {
    testCreateDocumentationCommentSnippet(
      {
        description: "description",
        params: null,
        returns: {
          description: "return value",
          type: "string",
        },
      },
      `/**
 * \${1:description}
 *
 * @returns {\${2:string}} \${3:return value}
 */
`
    );
  });

  it("should break a long description over 70 chars into several lines", () => {
    testCreateDocumentationCommentSnippet(
      {
        description:
          "123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789",
        params: null,
        returns: null,
      },
      `/**
 * \${1:123456789 123456789 123456789 123456789 123456789 123456789 123456789\n * 123456789}
 */
`
    );
  });

  it("should break a long @returns description taking the type into account", () => {
    testCreateDocumentationCommentSnippet(
      {
        description: "description",
        params: null,
        returns: {
          type: "type1 | type2 | type3",
          description:
            "123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789",
        },
      },
      `/**
 * \${1:description}
 *
 * @returns {\${2:type1 | type2 | type3}} \${3:123456789 123456789 123456789 123456789\n * 123456789 123456789 123456789 123456789}
 */
`
    );
  });

  it("should break a long @param description taking the type into account", () => {
    testCreateDocumentationCommentSnippet(
      {
        description: "description",
        params: [
          {
            name: "param1",
            type: "type1 | type2 | type3",
            description:
              "123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789",
          },
        ],
        returns: null,
      },
      `/**
 * \${1:description}
 *
 * @param {\${2:type1 | type2 | type3}} param1 - \${3:123456789 123456789 123456789\n * 123456789 123456789 123456789 123456789 123456789}
 */
`
    );
  });
});
