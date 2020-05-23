import fs from "fs";
import chalk from "chalk";
import path from "path";
import treeify from "treeify";
import inquirer from "inquirer";

import Handlebars from "./template.js";

const fsPromises = fs.promises;

const utf8 = { encoding: "utf8" };

function toObject(arr, obj = {}, value) {
  const [a, ...rest] = arr;
  const { [a]: curr, ...next } = obj;
  if (rest.length > 1) {
    return {
      ...next,
      [a]: toObject(rest, curr, value)
    };
  }
  return {
    ...next,
    [a]: {
      [rest[0]]: value,
      ...curr
    }
  };
}

async function readJSON(fileName) {
  const configPath = path.resolve(process.cwd(), fileName);
  const content = await fsPromises.readFile(configPath, utf8);
  return JSON.parse(content);
}

async function open(target, flag = "w+") {
  const file = path.basename(target);
  const dir = path.dirname(target);
  const ok = await fsPromises.mkdir(path.join(process.cwd(), dir), {
    recursive: true
  });
  const fileHandle = await fsPromises.open(
    path.join(process.cwd(), dir, file),
    flag
  );
  return fileHandle;
}

async function gen(configPath = "config.json", command, name) {
  if (!command) throw new Error("command is required");
  if (!name) throw new Error("name is required");
  const commands = await readJSON(configPath);

  const currentCommand = commands[command];
  if (!currentCommand) throw new Error("no command found", command);
  let answers = {};
  if (currentCommand.prompts) {
    answers = await inquirer.prompt(currentCommand.prompts);
  }
  let templateTree = {};
  let tree = {};

  // Payload data.

  for (const action of currentCommand.actions) {
    const data = { name, command, ...answers, ...action.data };
    let template;
    let destination;
    let templatePaths = [];
    let content = "";
    try {
      // Build source and sink.
      const templatePath = Handlebars.compile(action.template)(data);
      templatePaths = templatePath.split("/");

      // Load template.
      template = await open(templatePath, "a+");

      content = await template.readFile(utf8);

      templateTree = toObject(
        templatePaths,
        templateTree,
        content.length ? chalk.red("(exists)") : chalk.green("(created)")
      );
      if (!content.trim().length) {
        continue;
      }
    } catch (error) {
      templateTree = toObject(
        templatePaths,
        templateTree,
        chalk.red("(exists)")
      );
    }

    let destinationPaths = [];
    try {
      // Build write path.
      const destinationPath = Handlebars.compile(action.destination)(data);
      destinationPaths = destinationPath.split("/");
      destination = await open(destinationPath, "wx+");

      // Generate write file
      await destination.writeFile(Handlebars.compile(content)(data), utf8);

      tree = toObject(destinationPaths, tree, chalk.green("(created)"));
    } catch (error) {
      tree = toObject(destinationPaths, tree, chalk.red("(exists)"));
    }

    template?.close();
    destination?.close();
  }
  printTree(templateTree, "Generated templates");
  printTree(tree, "Generated code");
}

function isObject(o) {
  return o === Object(o) && !Array.isArray(o);
}

function printTree(tree = {}, msg = "") {
  if (!isObject(tree)) return;
  if (Object.keys(tree).length) {
    console.log(chalk.blue(msg));
    console.log(treeify.asTree(tree, true));
  }
}

export default gen;
