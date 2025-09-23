
const rpg = require('../utils/rpg');
module.exports = { name:'quest', description:'Do a quest', execute(message){ rpg.addXP(message.author.id,30); rpg.addGold(message.author.id,20); message.reply('Quest +30XP +20 gold'); } };
