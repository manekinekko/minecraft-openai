export default [
  `
// Get bot's current position
bot.entity.position;

// Stop any movement
bot.clearControlStates();

// Come to me
goToPlayer(bot, 2, target);

// Follow me 
goToPlayerInterval = setInterval(() => goToPlayer(bot, 2, target), 1000);

// Stop following me
clearInterval(goToPlayerInterval);

// Look at me
watchPlayer(target, bot);

// keep looking at me
watchInterval = setInterval(() => watchPlayer(target, bot), 1000);

// stop looking at me
clearInterval(watchInterval);

// Mine 10 blocks of dirt
mineBlock(bot, "dirt", mcData, 10);

// Mine 1 block of dirt
mineBlock(bot, "dirt", mcData, 1);

// Mine 3 blocks of dirt
mineBlock(bot, "dirt", mcData, 3);

// Get 4 oak logs
mineBlock(bot, "oak_log", mcData, 4);

// Craft sticks
const plankRecipe = bot.recipesFor(mcData.itemsByName.oak_planks.id ?? mcData.itemsByName.planks.id)[0];
await bot.craft(plankRecipe, 1, null);
const stickRecipe = bot.recipesFor(mcData.itemsByName.sticks.id)[0];
await bot.craft(stickRecipe, 1, null);
bot.chat('Crafting Sticks finished');
  `,
];
