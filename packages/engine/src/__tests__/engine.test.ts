import { describe, expect, it } from "vitest";
import { parseErrors } from "../parseErrors";

const opts = {
  dir: "./errors",
};

describe("parseErrors", () => {
  it("Should work", () => {
    expect(
      parseErrors(
        `Conversion of type 'string' to type 'string[]' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.`,
        opts,
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "code": 2352,
          "error": "Conversion of type '{0}' to type '{1}' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.",
          "improvedError": {
            "body": "It looks like you're trying to use \`as\` to 'cast' one type into another. Your first type:
      
      \`\`\`
      string
      \`\`\`
      
      doesn't match up with
      
      \`\`\`
      string[]
      \`\`\`
      
      because there isn't what I call 'sufficient overlap' between them. I.e. they don't look enough like each other.
      
      If you really meant to do this, you should cast \`string\` to \`unknown\` first. For example, if I wanted to cast \`string\` to \`string[]\`, I'd need to write this code:
      
      \`\`\`ts twoslash
      const a = \\"wow\\" as unknown as string[];
      \`\`\`
      ",
            "excerpt": "You can't use 'as' to convert 'string' into a 'string[]' - they don't share enough in common.",
          },
          "parseInfo": {
            "endIndex": 190,
            "firstItem": "string",
            "secondItem": "string[]",
            "startIndex": 0,
          },
        },
      ]
    `);

    expect(
      parseErrors(`Argument of type '{}' is not assignable to parameter of type '{ wow: { nice: boolean; }; }'.
    Property 'wow' is missing in type '{}' but required in type '{ wow: { nice: boolean; }; }'.`),
    ).toMatchInlineSnapshot(`
      [
        {
          "code": 2324,
          "error": "Property '{0}' is missing in type '{1}'.",
          "improvedError": null,
          "parseInfo": {
            "endIndex": 188,
            "firstItem": "wow",
            "secondItem": "{}' but required in type '{ wow: { nice: boolean; }; }",
            "startIndex": 97,
          },
        },
        {
          "code": 2345,
          "error": "Argument of type '{0}' is not assignable to parameter of type '{1}'.",
          "improvedError": null,
          "parseInfo": {
            "endIndex": 92,
            "firstItem": "{}",
            "secondItem": "{ wow: { nice: boolean; }; }",
            "startIndex": 0,
          },
        },
      ]
    `);

    expect(
      parseErrors(
        `The expected type comes from property 'nice' which is declared here on type '{ nice: boolean; }'`,
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "code": 6500,
          "error": "The expected type comes from property '{0}' which is declared here on type '{1}'",
          "improvedError": null,
          "parseInfo": {
            "endIndex": 96,
            "firstItem": "nice",
            "secondItem": "{ nice: boolean; }",
            "startIndex": 0,
          },
        },
      ]
    `);
  });

  it.only("REPL 2", () => {
    expect(
      parseErrors(
        `Property 'wow' is missing in type '{}' but required in type '{ wow: { nice: boolean; }; }'.`,
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "code": 2741,
          "error": "Property '{0}' is missing in type '{1}' but required in type '{2}'.",
          "improvedError": null,
          "parseInfo": {
            "endIndex": 91,
            "items": [
              "wow",
              "{}",
              "{ wow: { nice: boolean; }; }",
            ],
            "startIndex": 0,
          },
        },
      ]
    `);
  });
});
