export default [
  `
// Go forward
bot.setControlState('forward', true);

// Go back
bot.setControlState('back', true);

// jump
bot.setControlState('jump', true);

// Hello !
bot.chat("Hello friend!");
  
// Hi how are you ?
bot.chat("I'm fine, thanks!");

// What's your name ?
bot.chat("My name is " + bot.username);

// What's your favorite color ?
bot.chat("I like red");

// What's your favorite conference?
bot.chat("Devoxx France, of course!");
  `
];
