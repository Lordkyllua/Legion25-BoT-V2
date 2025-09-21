const clans = require('../utils/clans');
module.exports = { name:'joinclan', description:'Join clan', execute(message,args){
  const name=args[0]; if(!name) return message.channel.send('Usage: !joinclan <name>');
  const c = clans.getClanByName(name); if(!c) return message.channel.send('Clan not found');
  const r = clans.joinClan(message.author.id, c.id); if(!r.ok) return message.channel.send('❌ '+r.msg);
  message.channel.send(`✅ You joined ${c.name}`);
} };
