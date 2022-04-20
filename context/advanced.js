export default [
  `
// Get bot's current position
bot.entity.position;

// Stop any movement
bot.clearControlStates();

// Come to me
findPlayer(bot, 2, target);

// Follow me 
goToPlayerInterval = setInterval(() => followPlayer(bot, 2, target), 1000);

// Stop following me
clearInterval(goToPlayerInterval);

// Look at me
watchPlayer(target, bot);

// keep looking at me
watchInterval = setInterval(() => watchPlayer(target, bot), 1000);

// stop looking at me
clearInterval(watchInterval);

// Get dirt
mineBlock(bot, "dirt", mcData);

// Get oak log
mineBlock(bot, "oak_log");

// Craft sticks
const plankRecipe = bot.recipesFor(mcData.itemsByName.oak_planks.id ?? mcData.itemsByName.planks.id)[0];
await bot.craft(plankRecipe, 1, null);
const stickRecipe = bot.recipesFor(mcData.itemsByName.sticks.id)[0];
await bot.craft(stickRecipe, 1, null);
bot.chat('Crafting Sticks finished');
  `,
];
