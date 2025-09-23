
const clans = require('../utils/clans');
module.exports = { name:'createclan', description:'Create clan', execute(message,args){ const name=args.join(' '); if(!name) return message.reply('Usage: !createclan <name>'); const r=clans.createClan(name,message.author.id); if(!r.ok) return message.reply('Error: '+r.msg); message.reply('Clan created: '+r.clan.name); } };
