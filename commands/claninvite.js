const clans = require('../utils/clans');
module.exports = { name:'claninvite', description:'Invite user to clan', execute(message,args){
  const m = message.mentions.members.first(); if(!m) return message.channel.send('Mention a member');
  const c = clans.getUserClan(message.author.id); if(!c) return message.channel.send('You are not in a clan');
  if (c.leader !== message.author.id) return message.channel.send('Only leader can invite');
  clans.inviteToClan(c.id, m.id); message.channel.send(`✅ <@${m.id}> invited to ${c.name}`);
} };
