import pkg from 'mineflayer-pathfinder';
const { goals } = pkg;

export async function watchPlayer(target, bot) {
  await bot.lookAt(target.position.offset(0, target.height, 0));
}

export async function goToPlayer(bot, range, target) {
  await bot.pathfinder.setGoal(new goals.GoalFollow(target, range));
}

export async function giveToPlayer (bot, name, target, amount = 1) {
  await goToPlayer(bot, 2, target);
  bot.once('goal_reached', () => {
    const items = bot.inventory.items();
    const item = items.filter(item => item.name === name)[0];
    if (!item) {
      bot.chat(`I have no ${ name }`);
      return false;
    } else if (amount) {
      bot.toss(item.type, null, amount);
      bot.chat("Here you go!");
    }
  });
}

export async function mineBlock (bot, type, mcData, count = 1) {
  const blockType = mcData.blocksByName[type];
  if (!blockType) {
    bot.chat(`Unknown block type: ${type}`);
    return;
  }

  const blocks = bot.findBlocks({
    matching: blockType.id,
    maxDistance: 128,
    count: count
  });

  if (blocks.length === 0) {
    bot.chat("I don't see that block nearby.");
    return;
  }

  const targets = [];
  for (let i = 0; i < count; i++) {
    targets.push(bot.blockAt(blocks[i]));
  }

  bot.chat(`I found ${targets.length} ${type} blocks`);

  try {
    await bot.collectBlock.collect(targets);
    bot.chat('Done');

  } catch (err) {
    bot.chat(err.message);
  }
}
