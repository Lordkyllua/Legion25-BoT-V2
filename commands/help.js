
const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Show all available commands',
  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle('📜 Legion 25 Bot - Help')
      .setColor('Aqua')
      .setDescription('Available commands:')
      .addFields(
        { name: 'Games', value: '`!games`' },
        { name: 'RPG', value: '`!rpg`' },
        { name: 'Clans', value: '`!clan`' },
        { name: 'Roles', value: '`!roleadmin` (admin) and `!roles` (members)' },
        { name: 'Economy', value: '`!daily`, `!shop`, `!buy`, `!inventory`, `!ranking`' }
      )
      .setFooter({ text: '🤖 Developed by LordK' });
    message.reply({ embeds:[embed] });
  }
};
