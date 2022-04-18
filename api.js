import fetch from "isomorphic-fetch";
import dotenv from "dotenv";
dotenv.config();

import debug from "debug";
const error = debug("minecraft-openai.api:error");
const log = debug("minecraft-openai.api:log");

const STOP_WORD = "//";
const EOL = "\n";

/**
 * Call the OpenAI API with the previous context and the new user input.
 *
 * @param {string} input The user's input from the Minecraft chat.
 * @param {string} context The previous context to be sent to the OpenAI API
 * @returns {Pormise<{ id: string, object: string, created: number, mode: string, choices: Array<{ text: string, index: number, logprobs: any, finish_reason: text }> }>}
 */
export async function callOpenAI(input, context) {
  const openAIkey = process.env.CODEX_API_KEY;
  if (!openAIkey) {
    error("ERROR: CODEX_API_KEY is required.");
    process.exit(1);
  }

  const body = {
    prompt: context + STOP_WORD + " " + input + EOL,
    max_tokens: 300,
    temperature: 0,
    stop: STOP_WORD,
    n: 1,
  };

  log("payload %o", body);

  const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAIkey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    error("api response failed with statis %s", response.statusText);
    return;
  }

  return await response.json();
}
