
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'clan',
  description: 'Clan menu',
  execute(message) {
    const options = [
      { label: 'Create Clan', value: 'create' },
      { label: 'Join Clan', value: 'join' },
      { label: 'Leave Clan', value: 'leave' },
      { label: 'Clan Info', value: 'info' },
      { label: 'Invite Member', value: 'invite' }
    ];
    const select = new StringSelectMenuBuilder().setCustomId('clan_select').setPlaceholder('Choose a Clan action').addOptions(options);
    const row = new ActionRowBuilder().addComponents(select);
    const embed = new EmbedBuilder().setTitle('🏰 Clan Menu').setDescription('Select a clan action from the menu below.').setColor('Gold');
    message.reply({ embeds:[embed], components:[row] });
  }
};
