import chalk from "chalk";
import treeify from "treeify";
import inquirer from "inquirer";
import path from "path";

import handlebars from "./template.js";
import { createFolder, folderName, open, load, ext } from "./file";
import { mergeObject, isObject, toObject } from "./object.js";

const UTF8 = { encoding: "utf8" };

const FileStatus = {
  CREATED: chalk.green("(created)"),
  EXISTS: chalk.red("(exists)")
};

export const gen = async (options, type, name) => {
  const { config: configPath = "config.json", dryRun } = options;
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

  const command = config[type];
  if (!command)
    throw new Error(`Command "${type} is not specified in the ${configPath}"`);

  const { prompts, actions, environment } = command;

  const answers = prompts ? await inquirer.prompt(prompts) : {};
  const envvars = parseEnvironment(environment);

  const templateStatus = {};
  const destinationStatus = {};

  for (const action of actions) {
    const initialData = {
      name,
      type,
      ...answers,
      ...envvars
    };
    const variables = parseVariables(handlebars, initialData, action.variables);
    const data = {
      ...initialData,
      ...variables
    };

    let template;
    let destination;
    let content = "";

    // Read from template and write to destination.
    const templatePath = handlebars.compile(action.template)(data);
    const destinationPath = handlebars.compile(action.destination)(data);

    try {
      await createFolder(folderName(templatePath));
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
      console.log(chalk.red(`Skipping template: ${templatePath} is empty`));
      continue;
    }

    if (dryRun) {
      console.log(chalk.blue(`Printing ${templatePath}:`));
      console.log();
      console.log(handlebars.compile(content)(data));
      console.log();
    } else {
      try {
        await createFolder(folderName(destinationPath));
        destination = await open(destinationPath, "wx+");
        await destination.writeFile(handlebars.compile(content)(data), UTF8);

        destinationStatus[destinationPath] = FileStatus.CREATED;
      } catch (error) {
        destinationStatus[destinationPath] = FileStatus.EXISTS;
      } finally {
        destination?.close();
      }
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

export async function createConfig() {
  const config = require("../config.sample.json5");
  // Opens the file for read/write, but throws error when exists.
  const file = await open("config.json", "wx+");
  await file.writeFile(JSON.stringify(config, null, 2), UTF8);
}

function parseEnvironment(obj = {}) {
  const entries = Object.entries(obj).map(([key, value]) => {
    const environmentValue = process.env[value];
    if (!environmentValue) {
      throw new Error(`Env "${value}" is defined, but no value is provided`);
    }
    return [key, environmentValue];
  });
  return Object.fromEntries(entries);
}

// parseVariables parses the custom template variables that are action
// specific.
function parseVariables(handlebars, data, obj = {}) {
  const entries = Object.entries(obj).map(([key, value]) => {
    const parsed = handlebars.compile(value)(data);
    return [key, parsed];
  });
  return Object.fromEntries(entries);
}
