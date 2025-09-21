const clans = require('../utils/clans');
module.exports = { name:'createclan', description:'Create a clan', execute(message,args){
  const name = args[0]; if(!name) return message.channel.send('Usage: !createclan <name>');
  const r = clans.createClan(name, message.author.id); if(!r.ok) return message.channel.send('❌ ' + r.msg);
  message.channel.send(`✅ Clan created: ${r.clan.name}`);
} };
