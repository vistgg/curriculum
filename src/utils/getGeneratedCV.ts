import { CVSchemaType } from "@lightbringer/zod/CVSchema";
import { readFileSync } from "fs";
import { compile } from "handlebars";

export async function getGeneratedCV(
  data: CVSchemaType,
  template: string
): Promise<string> {
  const templatePath = `${process.cwd()}/src/templates/${template}.html`;

  const templateString = readFileSync(templatePath, "utf8");

  const templateFunction = compile(templateString);
  return templateFunction(data);
}
