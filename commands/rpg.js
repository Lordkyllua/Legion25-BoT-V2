
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'rpg',
  description: 'RPG menu',
  execute(message) {
    const options = [
      { label: 'Profile', value: 'profile' },
      { label: 'Quests', value: 'quests' },
      { label: 'Fight', value: 'fight' },
      { label: 'Level Up', value: 'levelup' }
    ];
    const select = new StringSelectMenuBuilder().setCustomId('rpg_select').setPlaceholder('Choose an RPG action').addOptions(options);
    const row = new ActionRowBuilder().addComponents(select);
    const embed = new EmbedBuilder().setTitle('⚔️ RPG Menu').setDescription('Select an action to interact with your RPG character.').setColor('Purple');
    message.reply({ embeds:[embed], components:[row] });
  }
};
