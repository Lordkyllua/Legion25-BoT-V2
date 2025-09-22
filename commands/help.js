const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Show all commands',
  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle('📜 Legion 25 Bot - Help')
      .setColor('Aqua')
      .setDescription('Commands grouped by category')
      .addFields(
        { name: '🎮 Games', value: '`!games` → Game menu (interactive)' },
        { name: '⚔️ RPG', value: '`!rpg` → RPG menu (interactive)' },
        { name: '🏰 Clans', value: '`!clan` → Clan menu (interactive)' },
        { name: '🎭 Roles', value: '`!roleadmin` → Admin config; `!roles` → Member role menu' },
        { name: '💰 Economy', value: '`!daily`, `!shop`, `!buy`, `!inventory`, `!ranking`' },
        { name: '👮 Moderation', value: '`!warn`, `!warnings`, `!mute`' }
      )
      .setFooter({ text: '🤖 Developed by LordK | Inspired by Tiny Survivors' });
    message.channel.send({ embeds: [embed] });
  }
};
