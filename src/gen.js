import fs from "fs";
import chalk from "chalk";
import path from "path";
import treeify from "treeify";
import inquirer from "inquirer";

import { mergeObject, isObject, toObject } from "./helper.js";
import Handlebars from "./template.js";

const fsPromises = fs.promises;

const utf8 = { encoding: "utf8" };

const cwd = (...paths) => path.resolve(process.cwd(), ...paths);

const FileStatus = {
  CREATED: chalk.green("(created)"),
  EXISTS: chalk.red("(exists)")
};

async function open(target, flag = "w+") {
  const [dir, file] = [path.dirname, path.basename].map(fn => fn(target));
  await fsPromises.mkdir(cwd(dir), {
    recursive: true
  });
  const fileHandle = await fsPromises.open(cwd(dir, file), flag);
  return fileHandle;
}

async function gen(configPath = "config.json", commandType, name) {
  const config = require(cwd(configPath));
  const command = config[commandType];
  if (!command)
    throw new Error(
      `Command "${commandType} is not specified in the config.json"`
    );

  const { prompts, actions } = command;

  const answers = prompts ? await inquirer.prompt(prompts) : {};

  let templateTree = {};
  let destinationTree = {};
  // Payload data.

  for (const action of actions) {
    const data = { name, command: commandType, ...answers, ...action.data };
    let template;
    let destination;
    let content = "";

    const templatePath = Handlebars.compile(action.template)(data);
    const templatePaths = templatePath.split("/");

    const destinationPath = Handlebars.compile(action.destination)(data);
    const destinationPaths = destinationPath.split("/");

    try {
      template = await open(templatePath, "a+");
      content = await template.readFile(utf8);

      templatePaths.push(
        content.length ? FileStatus.CREATED : FileStatus.EXISTS
      );
    } catch (error) {
      templatePaths.push(chalk.red("(exists)"));
    } finally {
      template?.close();
      templateTree = mergeObject(templateTree, toObject(templatePaths));
    }

    if (!content.trim().length) {
      continue;
    }

    try {
      destination = await open(destinationPath, "wx+");
      await destination.writeFile(Handlebars.compile(content)(data), utf8);

      destinationPaths.push(FileStatus.CREATED);
    } catch (error) {
      destinationPaths.push(FileStatus.EXISTS);
    } finally {
      destination?.close();
      destinationTree = mergeObject(
        destinationTree,
        toObject(destinationPaths)
      );
    }
  }

  printTree(templateTree, "Generated templates");
  printTree(destinationTree, "Generated codes");
}

function printTree(tree = {}, msg = "") {
  if (!isObject(tree)) return;
  if (Object.keys(tree).length) {
    console.log(chalk.blue(msg));
    console.log(treeify.asTree(tree, true));
  }
}

export default gen;
