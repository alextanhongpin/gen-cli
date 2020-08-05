#!/usr/bin/env node
require("json5/lib/register");

import chalk from "chalk";
import clear from "clear";
import commander from "commander";
import figlet from "figlet";
import path from "path";

import { gen, createConfig } from "./gen.js";

const { program } = commander;

clear();
console.log(
  chalk.green(figlet.textSync("gen-cli", { horizontalLayout: "full" }))
);

program
  .version("0.0.1")
  .description("Code generation for JavaScript")
  .option("-c, --config <type>", "Path to config file")
  .option("-d, --dry-run", "Print out template instead of writing to file");

program
  .command("g <type> <name>")
  .description("generates the file for the given type")
  .action(async (type, name) => {
    try {
      await gen(program, type, name);
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });

program
  .command("init")
  .description("generate sample config file")
  .action(async () => {
    try {
      await createConfig();
      console.log(chalk.green("created config.json"));
      console.log(
        chalk.blue(
          "Run '$ gen g my_service MyService' to generate your first template!"
        )
      );
    } catch (error) {
      console.log(
        chalk.red(
          error.code === "EEXIST" ? "config.json already exists" : error.message
        )
      );
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
