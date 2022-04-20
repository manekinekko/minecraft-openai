const defaultContext = [
  `// Go forward
  bot.setControlState('forward', true);
  
  // Go back
  bot.setControlState('back', true);

  // jump
  bot.setControlState('jump', true);
  
  // Hi how are you ?
  bot.chat("I'm fine, thanks!");
  
  // What's your name ?
  bot.chat("My name is " + bot.username);

  // stop
  bot.clearControlStates();

  // stop it
  bot.clearControlStates();

  // come to me
  findPlayer(bot, 2, target);

  // follow me 
  goToPlayerInterval = setInterval(() => followPlayer(bot, 2, target), 1000);

  // stop following me

  clearInterval(goToPlayerInterval);

  // look at me
  watchPlayer(target, bot);

  // keep looking at me
  watchInterval = setInterval(() => watchPlayer(target, bot), 1000);

  // stop looking at me
  clearInterval(watchInterval[0])

  // what is my name?
  bot.chat("Your name is " + username);
  
  // Get dirt
  mineBlock (bot, "dirt", mcData);

  // Get oak log
  mineBlock (bot, "oak_log");

  // Craft sticks,
  const plankRecipe = bot.recipesFor(mcData.itemsByName.oak_planks.id ?? mcData.itemsByName.planks.id)[0];
  await bot.craft(plankRecipe, 1, null);
  const stickRecipe = bot.recipesFor(mcData.itemsByName.sticks.id)[0];
  await bot.craft(stickRecipe, 1, null);
  bot.chat('Crafting Sticks finished');
  `
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
