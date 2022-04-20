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
  `
];
