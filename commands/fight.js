
const rpg = require('../utils/rpg');
module.exports = {
  name: 'fight',
  description: 'Fight a monster',
  execute(message){
    const enemies = [{name:'Goblin',hp:30,xp:20,gold:10},{name:'Orc',hp:60,xp:40,gold:30}];
    const enemy = enemies[Math.floor(Math.random()*enemies.length)];
    const player = Math.floor(Math.random()*30)+10;
    const enemyRoll = Math.floor(Math.random()*25)+5;
    if (player >= enemyRoll){ rpg.addXP(message.author.id, enemy.xp); rpg.addGold(message.author.id, enemy.gold); message.reply(`You defeated ${enemy.name}! +${enemy.xp} XP, +${enemy.gold} gold`); }
    else { rpg.damagePlayer(message.author.id,40); message.reply(`You were defeated by ${enemy.name}...`); }
  }
};
