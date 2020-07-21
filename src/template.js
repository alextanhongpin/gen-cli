import handlebars from "handlebars";

import { toPascal, toKebab, toCamel, toSnake } from "./naming.js";

handlebars.registerHelper("pascalCase", toPascal);
handlebars.registerHelper("kebabCase", toKebab);
handlebars.registerHelper("camelCase", toCamel);
handlebars.registerHelper("snakeCase", toSnake);

export default handlebars;
