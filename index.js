const mineflayer = require("mineflayer");

const bot = mineflayer.createBot({
  username: "OpenAI",
  host: "localhost",
  port: 51987,
});

bot.on("chat", (username, message) => {
  if (username === bot.username) return;
  bot.chat(message);
  if (message === "jump") {
    // @todo call OpenAI API
    eval(`
    bot.setControlState('jump', true);
    setTimeout(() => {
      bot.setControlState('jump', false);
    }, 1000);
    `);

  }
});

// Log errors and kick reasons:
bot.on("kicked", console.log);
bot.on("error", console.log);

const { mineflayer: mineflayerViewer } = require("prismarine-viewer");
bot.once("spawn", () => {
  mineflayerViewer(bot, { port: 8080, firstPerson: true }); // port is the minecraft server port, if first person is false, you get a bird's-eye view
});