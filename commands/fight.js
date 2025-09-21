const rpg = require('../utils/rpg');
module.exports = { name:'fight', description:'Fight a monster', execute(message){
  // delegate to rpg fight logic for simplicity
  const enemies = [{name:'Goblin',hp:30,xp:20,gold:10},{name:'Orc',hp:60,xp:40,gold:30},{name:'Dragon',hp:120,xp:100,gold:80}];
  const enemy = enemies[Math.floor(Math.random()*enemies.length)];
  const playerPower = Math.floor(Math.random()*30)+10;
  const enemyPower = Math.floor(Math.random()*25)+5;
  if (playerPower >= enemyPower) { rpg.addXP(message.author.id, enemy.xp); rpg.addGold(message.author.id, enemy.gold); message.channel.send(`⚔️ You defeated **${enemy.name}**! +${enemy.xp} XP, +${enemy.gold} gold`); }
  else { rpg.damagePlayer(message.author.id,50); message.channel.send(`💥 You were defeated by **${enemy.name}**...`); }
} };
