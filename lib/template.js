import Handlebars from "handlebars";

import {
  toPascalCase,
  toKebabCase,
  toCamelCase,
  toSnakeCase
} from "./naming.js";

Handlebars.registerHelper("pascalCase", toPascalCase);
Handlebars.registerHelper("kebabCase", toKebabCase);
Handlebars.registerHelper("camelCase", toCamelCase);
Handlebars.registerHelper("snakeCase", toSnakeCase);

export default Handlebars;
