
module.exports = {
  name: 'mute',
  description: 'Mute a member (create Muted role if needed)',
  async execute(message) {
    if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply('No permission');
    const member = message.mentions.members.first();
    if (!member) return message.reply('Mention a member');
    let role = message.guild.roles.cache.find(r=>r.name==='Muted');
    if (!role) {
      role = await message.guild.roles.create({ name:'Muted', permissions:[] });
      for (const ch of message.guild.channels.cache.values()) {
        try { await ch.permissionOverwrites.create(role, { SendMessages:false, AddReactions:false, Speak:false }); } catch(e){}
      }
    }
    await member.roles.add(role);
    message.reply(`${member.user.tag} has been muted.`);
  }
};
