#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import commander from "commander";
import figlet from "figlet";
import path from "path";

import { gen } from "./gen.js";

const { program } = commander;

clear();
console.log(
  chalk.green(figlet.textSync("gen-cli", { horizontalLayout: "full" }))
);

program
  .version("0.0.1")
  .description("Code generation for JavaScript")
  .option("-c, --config <type>", "Path to config file");

program
  .command("g <type> <name>")
  .description("generates the file for the given type")
  .action(function(type, name) {
    try {
      gen(program.config, type, name);
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
