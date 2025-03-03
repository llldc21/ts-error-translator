import * as path from "path";
import * as fs from "fs";
import fm from "front-matter";

export const getImprovedMessage = (
  dir: string,
  code: number,
  items: string[],
) => {
  const file = path.join(dir, `${code}.md`);

  try {
    const fileResult = fs.readFileSync(file, "utf8");

    const parseResult = fm<{ excerpt: string }>(fileResult);

    let body = parseResult.body;
    let excerpt = parseResult.attributes.excerpt;

    items.forEach((item, index) => {
      const bodyRegex = new RegExp(`\\\{${index}\\\}`, "g");
      body = body.replace(bodyRegex, item);
      const excerptRegex = new RegExp(`'\\\{${index}\\\}'`, "g");
      excerpt = excerpt.replace(excerptRegex, "`" + item + "`");
    });

    return {
      body,
      excerpt,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};
