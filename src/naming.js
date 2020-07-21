const pattern = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

export const toSnake = str =>
  str &&
  str
    .match(pattern)
    .map(x => x.toLowerCase())
    .join("_");

export const toKebab = str =>
  str &&
  str
    .match(pattern)
    .map(x => x.toLowerCase())
    .join("-");

//https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
export const toCamel = str => {
  str = str.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return str.substr(0, 1).toLowerCase() + str.substr(1);
};

export const toPascal = str => {
  return `${str}`
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w+)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, "g"), "")
    .replace(new RegExp(/\w/), s => s.toUpperCase());
};
