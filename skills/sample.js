import pkg from 'mineflayer-pathfinder';
const { goals } = pkg;

export async function watchPlayer(target, bot) {
  await bot.lookAt(target.position.offset(0, target.height, 0));
}

export async function followPlayer(bot, range, target) {
  await bot.pathfinder.setGoal(new goals.GoalFollow(target, range));
}

export async function mineBlock(bot, blockName, mcData) {
  if (mcData.blocksByName[blockName] === undefined) {
    bot.chat(`${blockName} is not a block name`);
    return;
  }

  const ids = [mcData.blocksByName[blockName].id];
  bot.chat(`their ids are ${ids}`);
  const blocks = bot.findBlocks({
    matching: ids,
    maxDistance: 128,
  });

  bot.chat(`I found ${blocks.length} ${blockName} blocks`);

  // TODO: this is not working!
  await bot.collectBlock.collect(blocks);
}
