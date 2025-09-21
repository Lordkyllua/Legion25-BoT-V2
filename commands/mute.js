module.exports = { name:'mute', description:'Mute a member', async execute(message,args){
  if(!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send('No permission');
  const member = message.mentions.members.first(); if(!member) return message.channel.send('Mention member');
  let role = message.guild.roles.cache.find(r=>r.name==='Muted');
  if(!role) {
    role = await message.guild.roles.create({ name:'Muted', permissions:[] });
    for(const [id,ch] of message.guild.channels.cache) {
      await ch.permissionOverwrites.edit(role, { SendMessages: false, AddReactions:false, Speak:false }).catch(()=>{});
    }
  }
  await member.roles.add(role);
  message.channel.send(`🔇 ${member.user.tag} muted.`);
} };
