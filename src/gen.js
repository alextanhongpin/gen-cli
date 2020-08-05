import chalk from "chalk";
import treeify from "treeify";
import inquirer from "inquirer";
import path from "path";

import handlebars from "./template.js";
import { createFolder, folderName, open, load, ext } from "./file";

const UTF8 = { encoding: "utf8" };

const FileStatus = {
  SKIP: "skip",
  CREATED: "created",
  EXISTS: "exists"
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

  const { version, actions } = config;
  const action = actions.find(action => action.name === type);
  if (!action)
    throw new Error(`Action "${type} is not specified in the ${configPath}"`);

  const { prompts, templates, environment } = action;

  const answers = prompts ? await inquirer.prompt(prompts) : {};
  const envvars = parseEnvironment(environment);
  const status = {};

  for (const template of templates) {
    const initialData = {
      name,
      type,
      ...answers,
      ...envvars
    };
    const variables = parseVariables(
      handlebars,
      initialData,
      template.variables
    );
    const data = {
      ...initialData,
      ...variables
    };

    let source;
    let destination;
    let content = "";

    // Read from template and write to destination.
    const [sourcePath, destinationPath] = handlebars
      .compile(template.path)(data)
      .split(path.delimiter);

    try {
      source = await open(sourcePath, "a+");
      content = await source.readFile(UTF8);
    } catch (error) {
      status[sourcePath] = error.message;
    } finally {
      source?.close();
    }

    if (!content.trim().length) {
      status[destinationPath] = `template is empty: ${sourcePath}`;
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

        status[destinationPath] = FileStatus.CREATED;
      } catch (error) {
        status[destinationPath] =
          error.code === "EEXIST" ? `file exists` : error.message;
      } finally {
        destination?.close();
      }
    }
  }

  console.table(status);
};

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
