import pkg from 'mineflayer-pathfinder';
const { pathfinder, goals } = pkg;
import minecraftData from "minecraft-data";
import collectBlock from 'mineflayer-collectblock';

 
export async function watchPlayer(target, bot) {
    await bot.lookAt(target.position.offset(0, target.height, 0));
  }

export async function followPlayer (bot, range, target) {
    bot.loadPlugin(pathfinder);
    await bot.pathfinder.setGoal(new goals.GoalFollow(target, range))
  }

export function mineBlock (bot, blockName, mcData) {
    bot.loadPlugin(collectBlock.plugin);
    // const mcData = minecraftData(bot.version);
    if (mcData.blocksByName[blockName] === undefined) {
        bot.chat(`${blockName} is not a block name`)
        return
      }
    
    const ids = [mcData.blocksByName[blockName].id]
    bot.chat(`their ids are ${ids}`)
    const blocks = bot.findBlocks({ 
        matching: ids, 
        maxDistance: 128
    })
    bot.chat(`I found ${blocks.length} ${blockName} blocks`)
    bot.collectBlock.collect(blocks)
  }