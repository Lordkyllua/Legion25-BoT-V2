
const clans = require('../utils/clans');
module.exports = { name:'joinclan', description:'Join clan', execute(message,args){ const name=args.join(' '); if(!name) return message.reply('Usage: !joinclan <name>'); const c=clans.getClanByName(name); if(!c) return message.reply('Clan not found'); const r=clans.joinClan(message.author.id,c.id); if(!r.ok) return message.reply('Error: '+r.msg); message.reply('You joined '+c.name); } };
