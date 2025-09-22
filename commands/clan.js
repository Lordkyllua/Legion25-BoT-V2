const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'clan',
  description: 'Clan interactive menu',
  async execute(message) {
    const options = [
      { label: 'Create Clan', value: 'create' },
      { label: 'Join Clan', value: 'join' },
      { label: 'Leave Clan', value: 'leave' },
      { label: 'Clan Info', value: 'info' },
      { label: 'Invite Member', value: 'invite' }
    ];
    const select = new StringSelectMenuBuilder().setCustomId('clan_select').setPlaceholder('Clan action').addOptions(options);
    const row = new ActionRowBuilder().addComponents(select);
    const embed = new EmbedBuilder().setTitle('🏰 Clan Menu').setDescription('Choose a clan action').setColor('Gold');
    message.channel.send({ embeds: [embed], components: [row] });
  }
};
