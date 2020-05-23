const pattern = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

export const toSnakeCase = str =>
  str &&
  str
    .match(pattern)
    .map(x => x.toLowerCase())
    .join("_");

export const toKebabCase = str =>
  str &&
  str
    .match(pattern)
    .map(x => x.toLowerCase())
    .join("-");

export const toCamelCase = str =>
  str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

export const toPascalCase = str =>
  str.replace(
    /\w\S*/g,
    m => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase()
  );
