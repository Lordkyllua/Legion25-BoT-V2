const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'rpg',
  description: 'RPG interactive menu',
  async execute(message) {
    const options = [
      { label: 'Profile', value: 'profile' },
      { label: 'Quests', value: 'quests' },
      { label: 'Fight', value: 'fight' },
      { label: 'Level Up', value: 'levelup' }
    ];
    const select = new StringSelectMenuBuilder().setCustomId('rpg_select').setPlaceholder('Choose an action').addOptions(options);
    const row = new ActionRowBuilder().addComponents(select);
    const embed = new EmbedBuilder().setTitle('⚔️ RPG Menu').setDescription('Choose an RPG action').setColor('Purple');
    message.channel.send({ embeds: [embed], components: [row] });
  }
};
