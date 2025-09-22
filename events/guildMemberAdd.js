const cfg = require('../config.json');
module.exports = {
  name: 'guildMemberAdd',
  execute(client, member) {
    const chId = cfg.welcomeChannel || member.guild.systemChannelId;
    if (!chId) return;
    const ch = member.guild.channels.cache.get(chId);
    if (ch) ch.send(`👋 Welcome ${member.user.username} to **${member.guild.name}**!`);
  }
};
