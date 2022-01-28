const mineflayer = require("mineflayer");
const fetch = require('isomorphic-fetch');

const bot = mineflayer.createBot({
  username: "OpenAI",
  host: "localhost",
  port: 51141, //example of port
});



bot.on("chat", async (username, message) => {
  if (username === bot.username) return;

  context = `
  // Go forward
  bot.setControlState('forward', true);

  // Hi how are you ?
  bot.chat("I'm fine, thanks!");

  // What's your name ?
  bot.chat("My name is " + bot.username);
  `

  input = `${context}// ${message}\n`

  async function getResponse(input) {
    console.log("INPUT :", input)
    const response = await fetch(
      'https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${CODEX_API_KEY}` //YOUR API KEY HERE
        },
        body: JSON.stringify({
          prompt: input,
          max_tokens: 300,
          temperature: 0,
          stop: "//",
          n: 1
        })
      }
    );
    const json = await response.json();
    return json;
  }

  const response = await getResponse(input);
  console.log("OPEN AI RESPONSE: ", response)
  
  const code = await response.choices.map(choice => choice.text);
  console.log("CODE: ", code)
  await eval("(async () => {return " + code + "})()");
  });

// Log errors and kick reasons:
bot.on("kicked", console.log);
bot.on("error", console.log);

const { mineflayer: mineflayerViewer } = require("prismarine-viewer");
bot.once("spawn", () => {
  mineflayerViewer(bot, { port: 8080, firstPerson: true }); // port is the minecraft server port, if first person is false, you get a bird's-eye view
});