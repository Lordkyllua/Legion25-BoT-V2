const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'clan',
  description: 'Clan menu',
  execute(message) {
    const embed = new EmbedBuilder().setTitle('🏰 Clan Menu').setColor('Gold').setDescription('Use: !rpg createclan/joinclan/leaveclan/claninfo').setFooter({ text: 'Developed by LordK' });
    message.channel.send({ embeds: [embed] });
  }
};
