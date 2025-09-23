
const rpg = require('../utils/rpg');
module.exports = { name:'rpgprofile', description:'Show RPG profile', execute(message){ const p=rpg.getProfile(message.author.id); message.reply(`${message.author.username} - L${p.level} XP:${p.xp} HP:${p.hp} Gold:${p.gold}`); } };
