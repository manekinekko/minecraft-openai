require("dotenv").config();
const mineflayer = require("mineflayer");
const mineflayerViewer = require("prismarine-viewer").mineflayer;
let Context = require("./Context");
let Model = require("./Model");
const commands = require("./context/1.0-commands");

const context = new Context(commands);
const model = new Model();

const bot = mineflayer.createBot({
  host: process.env.IP ?? "localhost", // minecraft server ip
  port: process.env.PORT ?? 25565, // minecraft server port
  username: process.env.MC_USERNAME ? process.env.MC_USERNAME : "OpenAI",
});

let _DEBUG = process.env.DEBUG === "true";

function _log (m) {
  if (_DEBUG) bot.chat(m);
  else console.log(m);
}

// Event subscriptions
bot.on("chat", async (username, message) => {
  if (username === bot.username) return;

  let completion;
  target = bot.players[username].entity;

  const prompt = context.craftPrompt(message);
  try {
    completion = await model.getCompletion(prompt);
  } catch (err) {
    console.log("Error calling Codex", err);

    // if err string contains 400
    if (err.message.includes("400")) {
      bot.chat(
        "I had to reset my brain and might have forgotten some context. Sorry about that!"
      );
      context.resetContext();
    }
    return;
  }

  if (completion) {
    // Automatically append this interaction to the context
    context.addInteraction(message, completion);
    await evaluateCode(completion);
  }

  async function evaluateCode(code, recursive = false) {
    // Echo the code produced for players to see it. Don't echo when the bot code is already producing dialog or it will double echo
    if (code && !code.startsWith("bot.chat")) {
      // Echo the first 9 lines of code. Any more can result in the bot being expelled from the server for spamming
      const lines = code?.split("\n");
      const firstNine = lines.slice(0, 9).join("\n");
      _log(firstNine);
    }
    try {
      await eval("(async () => {return " + code + "})()").catch((err) => handleError(err));
      if (recursive) {
        bot.chat(result);
        context.addInteraction("Response: " + result, "\n");
      }
      return true;
    } catch (err) {
      handleError(err);
      return false;
    }
  }

  function handleError (err) {
    console.log("Error evaluating code:", err);
    bot.chat(err.message);
    if (err.name !== "Error") {
      context.removeLastInteraction();
      bot.chat("I unlearned our last interaction!");
    }
  }
});

bot.once("spawn", () => {
  bot.chat("hello world!");
  mineflayerViewer(bot, {
    port: 3030,
    firstPerson: false,
  });
});
