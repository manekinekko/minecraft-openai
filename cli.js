#!/usr/bin/env node

import debug from "debug";
import bot from "./bot.js";
import { program } from "commander";

const log = debug("minecraft-openai.cli:log");
const error = debug("minecraft-openai.cli:error");

// check node version and exit if it's not ok
if (process.version.slice(1).split(".")[0] < 16) {
  error(`Node.js ${process.version} was detected. Node.js v16+ is required.`);
  process.exit(1);
}

program
  .name("minecraft-openai")
  .description("Playing Minecraft with OpenAI (proof of concept)")
  
program.command('start')
  .description('start the bot')
  .option("--host <host>", "hostname of the minecraft server", "localhost")
  .option("--port <port>", "port of the minecraft server", 25565)
  .option("--username <username>", "username of the bot", "OpenAI")
  .action(async(options) => {
    log("starting bot");
    await bot(options.host, options.port, "OpenAI").catch(error);
  });


program.parse();

