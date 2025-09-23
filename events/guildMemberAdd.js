
module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client) {
    try {
      const cfg = require('../config.json');
      const chId = cfg.welcomeChannel || member.guild.systemChannelId;
      if (!chId) return;
      const ch = member.guild.channels.cache.get(chId);
      if (ch) ch.send(`👋 Welcome ${member.user} to **${member.guild.name}**!`);
    } catch (e) { console.error('guildMemberAdd error', e); }
  }
};
