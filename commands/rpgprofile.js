const rpg = require('../utils/rpg');
module.exports = {
  name: 'rpgprofile',
  description: 'Show RPG profile',
  execute(message,args){ const p=rpg.getProfile(message.author.id); message.channel.send(`📜 ${message.author.username} — Level ${p.level} — XP ${p.xp} — HP ${p.hp} — Gold ${p.gold}`); }
};
