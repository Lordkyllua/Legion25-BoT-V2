const rpg = require('../utils/rpg');
module.exports = { name:'quest', description:'Complete a quest', execute(message){ rpg.addXP(message.author.id,30); rpg.addGold(message.author.id,20); message.channel.send('📝 Quest done: +30 XP, +20 gold'); } };
