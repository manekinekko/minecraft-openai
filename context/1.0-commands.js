// First take at example usage of the mineflayer API. These examples demonstrate usage of bot.chat, general movement, and a "watchTarget" function 
// that is globally available
let commands = `// Minecraft bot commands, using mineflayer. When the comment is conversational, the bot will respond as a helpful minecraft bot. Otherwise, it will do as asked

// Go forward
bot.setControlState('forward', true);

// Go backwards
bot.setControlState('back', true)

// Hello!
bot.chat("Yo! How's it going?");

// Good! How are you?
bot.chat("I'm doing fine, thanks!");

// Turn right
bot.setControlState('right', true)
      
// Sprint
bot.setControlState('sprint', true)

// Stop
bot.clearControlStates()

// Jump
bot.setControlState('jump', true);
bot.setControlState('jump', false);
  
// Run Fast"
bot.setControlState('sprint', true);

// Hey Bot, Jump!
bot.setControlState('jump', true);
bot.setControlState('jump', false);

// Look at me
watchTarget();

// Look at me continously
watchInterval = setInterval(watchTarget, 50)

// Stop looking at me
clearInterval(watchInterval)

// Ok, keep looking at me again
watchInterval = setInterval(watchTarget, 50)

// Ahh stop it, that's creepy
clearInterval(watchInterval)

// Jump several times
bot.setControlState('jump', true)
setTimeout(() => {
  bot.setControlState('jump', false)
}, 3000);

// Okay, look at me
watchInterval = setInterval(watchTarget, 50)

// Enough! That's terrible!
clearInterval(watchInterval)

// Let's go to the right
bot.setControlState('right', true)

// Enough of that!
bot.clearControlStates()

`;

// export the commands
module.exports = commands;