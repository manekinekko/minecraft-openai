import debug from "debug";
import empty from "./empty.js";


const warn = debug("minecraft-openai.context:warn");
let currentContext = empty;

/**
 * Update the context with the latest user's input.
 *
 * @param {string} input The user's input from the Minecraft chat.
 * @param {string} code The code example to be inserted in the last context.
 */
export const updateContext = (input, code) => {
  currentContext.push(`// ${input}`);
  currentContext.push(code);
};

/**
 * Get the current context as a string.
 *
 * @returns {string} The new context to be sent to the OpenAI API.
 */
export const context = () => {
    if (currentContext.length) {
        return currentContext.join("\n");
    }
    warn("No context available: %o", currentContext);
    return "";
};

/**
 * Load the context from a context file.
 *
 * @param {string[]} context The context to be loaded.
 */
export const loadContext = async (context) => {
  try {
    currentContext = (await import(`./${context}.js`)).default;
  } catch (err) {
    warn(err.message);
    currentContext = (await import(`./empty.js`)).default;
    warn("Loading empty context.");
  }
};

/**
 * Clear the current context.
 */
export const clearContext = () => {
  currentContext = empty;
};
