import handlebars from "handlebars";

import {
  toPascalCase,
  toKebabCase,
  toCamelCase,
  toSnakeCase
} from "./naming.js";

handlebars.registerHelper("pascalCase", toPascalCase);
handlebars.registerHelper("kebabCase", toKebabCase);
handlebars.registerHelper("camelCase", toCamelCase);
handlebars.registerHelper("snakeCase", toSnakeCase);

export default handlebars;
