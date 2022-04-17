import debug from "debug";
import mineflayer from "mineflayer";
import { mineflayer as mineflayerViewer } from "prismarine-viewer";
import { context, updateContext } from "./context.js";
import { callOpenAI } from "./api.js";

const log = debug("minecraft-openai.bot:log");
const error = debug("minecraft-openai.bot:error");

export default async function bot(host, port, username) {
  const bot = mineflayer.createBot({
    username: username || "OpenAI",
    host: host || "localhost",
    port,
    verbose: true
  });

  bot.on("login", () => {
    log("bot joined the game");
  });

  bot.on("chat", async (username, input) => {
    if (username === bot.username) return;

    const previousContext = context();
    log("input: %s", input);
    log("context: %s", previousContext);

    // call the OpenAI API
    const response = await callOpenAI(input, previousContext);

    if (response) {
      log("request: %s", response.id);
      log("codex: %s", response.model);
      log("choices: %o", response.choices);

      // extract code instructions from response
      const code = await response.choices.map((choice) => choice.text).join("\n");
      log("code: ", code);

      // the code is executed in the context of the bot entity
      // await injectCommand(code);
      eval(code);

      // update the context for the next time
      updateContext(input, code);
    } else {
      log("OpenAI response was empty. Ignore.");
    }
  });

  // Log errors and kick reasons:
  bot.on("kicked", log);
  bot.on("error", log);

  bot.once("spawn", () => {
    // port is the minecraft server port, if first person is false, you get a bird's-eye view
    mineflayerViewer(bot, { port: 8080, firstPerson: true });
  });
}

function injectCommand(code) {
  try {
    eval(code);
  } catch (err) {
    error("error: %s", err.message);
  }
}
