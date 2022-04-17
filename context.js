const defaultContext = [
  "// Go forward",
  "bot.setControlState('forward', true);",
  
  "// Go back",
  "bot.setControlState('back', true);",
  
  "// Hi how are you ?",
  `bot.chat("I'm fine, thanks!");`,
  
  "// What's your name ?",
  `bot.chat("My name is " + bot.username);`,
  
  "// What's your age ?",
  `bot.chat("I'm " + bot.entity.age + " years old");`,
    
];

/**
 * Update the context with the latest user's input.
 *
 * @param {string} input The user's input from the Minecraft chat.
 * @param {string} code The code example to be inserted in the last context.
 */
export const updateContext = (input, code) => {
  defaultContext.push(`// ${input}`);
  defaultContext.push(code);
};

/**
 * Get the current context as a string.
 *
 * @returns {string} The new context to be sent to the OpenAI API.
 */
export const context = () => {
  return defaultContext.join("\n");
};
