const clans = require('../utils/clans');
module.exports = { name:'claninfo', description:'Clan info', execute(message,args){
  const name = args[0]; if(!name) return message.channel.send('Usage: !claninfo <name>');
  const c = clans.getClanByName(name); if(!c) return message.channel.send('Clan not found');
  message.channel.send(`🏰 ${c.name} — Leader: <@${c.leader}> — Members: ${c.members.length}`);
} };
