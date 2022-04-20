import debug from "debug";
import minecraftData from "minecraft-data";
import mineflayer from "mineflayer";
import { mineflayer as mineflayerViewer } from "prismarine-viewer";
import { callOpenAI } from "./api.js";
import { context, updateContext } from "./context.js";
import { watchPlayer, followPlayer, mineBlock } from "./skills/sample.js";

const log = debug("minecraft-openai.bot:log");
const error = debug("minecraft-openai.bot:error");
// @ts-ignore
// will be used to craft items
var mcData;

export default async function bot(host, port, username) {
  const bot = mineflayer.createBot({
    username: username || "OpenAI",
    host: host || "localhost",
    port,
    verbose: true,
  });

  let target = null;

  bot.on("spawn", () => {
    mcData = minecraftData(bot.version);
    log("Minecraft version: %s", bot.version);
    log("Minecraft protocol version: %s", bot.protocolVersion);
  });

  bot.on("login", () => {
    log("bot joined the game");
  });

  bot.on("chat", async (username, input) => {
    if (username === bot.username) return;
    let goToPlayerInterval = null;
    let watchInterval = null;

    const previousContext = context();
    log("input: %s", input);
    log("context: %s", previousContext);

    // call the OpenAI API
    const response = await callOpenAI(input, previousContext);
    target = bot.players[username].entity;

    if (response) {
      log("request: %s", response.id);
      log("codex: %s", response.model);
      log("choices: %o", response.choices);

      // extract code instructions from response
      const code = await response.choices
        .map((choice) => choice.text)
        .join("\n");
      log("code: ", code);

      // the code is executed in the context of the bot entity
      // await injectCommand(code);
      try {
        await eval(`(async () => { ${code} })()`);
        // update the context for the next time
        // Note: we only update context if the code is valid
        updateContext(input, code);
      } catch (err) {
        error("error: %s", err.message);
        bot.chat(`error: ${err.message}`);
      }

    } else {
      log("OpenAI response was empty. Ignore.");
    }
  });

  // Log errors and kick reasons:
  bot.on("kicked", log);
  bot.on("error", log);

  bot.once("spawn", () => {
    // port is the minecraft server port, if first person is false, you get a bird's-eye view
    try {
      mineflayerViewer(bot, { port: 31337, firstPerson: true });
    } catch (err) {
      error("error: %s", err.message);
    }
  });
}

