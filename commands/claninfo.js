
const clans = require('../utils/clans');
module.exports = { name:'claninfo', description:'Clan info', execute(message,args){ const name=args.join(' '); if(!name) return message.reply('Usage: !claninfo <name>'); const c=clans.getClanByName(name); if(!c) return message.reply('Clan not found'); message.reply(`Clan ${c.name} — Leader: <@${c.leader}> — Members: ${c.members.length}`); } };
