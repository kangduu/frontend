#! /usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { program } from "commander";
import inquirer from "inquirer";
import { checkPath, downloadTemp } from "./utils.js";

// Set the version from package.json
// let json = fs.readFileSync("package.json", "utf8");
const absFilePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "package.json"
);
const json = JSON.parse(fs.readFileSync(absFilePath, "utf8"));
program.version(json.version);

program
  .command("create <name>")
  .description("Create a new project")
  .action((name) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "projectName",
          message: "Enter the project name:",
          default: name,
        },
        {
          type: "confirm",
          name: "isTypeScript",
          message: "Would you like to use TypeScript?",
        },
      ])
      .then((answers) => {
        if (checkPath(answers.projectName)) {
          console.log("项目已存在");
          return;
        }

        if (answers.isTypeScript) {
          console.log("用户选择了 TypeScript");
          downloadTemp("ts", answers.projectName);
        } else {
          console.log("使用默认值 JavaScript");
          downloadTemp("js", answers.projectName);
        }
      })
      .catch(() => {
        console.log("创建失败请重新尝试(TдT)");
        process.exit(1);
      });
  });

// Parse the command line arguments
program.parse(process.argv);
