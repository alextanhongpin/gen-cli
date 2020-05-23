import chalk from "chalk";
import treeify from "treeify";
import inquirer from "inquirer";
import path from "path";

import handlebars from "./template.js";
import { open, load, ext } from "./file";
import { mergeObject, isObject, toObject } from "./object.js";

const UTF8 = { encoding: "utf8" };

const FileStatus = {
  CREATED: chalk.green("(created)"),
  EXISTS: chalk.red("(exists)")
};

export const gen = async (configPath = "config.json", commandType, name) => {
  const config = load(configPath);

  // Allow extending of handlebars if a config.js file is loaded.
  switch (ext(configPath)) {
    case ".js":
      if (config.handlebars && typeof config.handlebars === "function") {
        config.handlebars(handlebars);
      }
      delete config.handlebars;
      break;
    default:
  }

  const command = config[commandType];
  if (!command)
    throw new Error(
      `Command "${commandType} is not specified in the ${configPath}"`
    );

  const { prompts, actions } = command;

  const answers = prompts ? await inquirer.prompt(prompts) : {};

  const templateStatus = {};
  const destinationStatus = {};

  for (const action of actions) {
    const data = {
      name,
      command: commandType,
      ...answers,
      ...action.data
    };

    let template;
    let destination;
    let content = "";

    // Read from template and write to destination.
    const templatePath = handlebars.compile(action.template)(data);
    const destinationPath = handlebars.compile(action.destination)(data);

    try {
      template = await open(templatePath, "a+");
      content = await template.readFile(UTF8);
      templateStatus[templatePath] = content.length
        ? FileStatus.CREATED
        : FileStatus.EXISTS;
    } catch (error) {
      templateStatus[templatePath] = FileStatus.EXISTS;
    } finally {
      template?.close();
    }

    if (!content.trim().length) {
      continue;
    }

    try {
      destination = await open(destinationPath, "wx+");
      await destination.writeFile(handlebars.compile(content)(data), UTF8);

      destinationStatus[destinationPath] = FileStatus.CREATED;
    } catch (error) {
      destinationStatus[destinationPath] = FileStatus.EXISTS;
    } finally {
      destination?.close();
    }
  }

  printTree(templateStatus, "Generated templates");
  printTree(destinationStatus, "Generated codes");
};

function printTree(obj = {}, msg = "") {
  if (!isObject(obj)) return;
  if (!Object.keys(obj).length) return;

  let tree = {};
  for (const key in obj) {
    const paths = key.split(path.sep);
    const status = obj[key];
    tree = mergeObject(tree, toObject(paths.concat(status)));
  }
  console.log(chalk.blue(msg));
  console.log(treeify.asTree(tree, true));
}
