export default [
  `
// Go forward
bot.setControlState('forward', true);

// Go back
bot.setControlState('back', true);

// jump
bot.setControlState('jump', true);
  
// Hi how are you ?
bot.chat("I'm fine, thanks!");

// What's your name ?
bot.chat("My name is " + bot.username);

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

// Give me 5 dirt
giveToPlayer (bot, "dirt", target, 5);

// Give 4 dirt
giveToPlayer (bot, "dirt", target, 4);

// Drop 2 dirt
giveToPlayer (bot, "dirt", target, 2);

// Drop 1 dirt
giveToPlayer (bot, "dirt", target, 1);

// Get 4 oak logs
mineBlock(bot, "oak_log", mcData, 4);

  `,
];
