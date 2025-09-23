
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'clan',
  description: 'Clan main menu',
  execute(message){
    const embed = new EmbedBuilder().setTitle('Clan Menu').setDescription('Use the buttons to manage clans').setColor('Blue');
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('clan_create').setLabel('Create').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('clan_join').setLabel('Join').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('clan_info').setLabel('Info').setStyle(ButtonStyle.Secondary)
    );
    message.reply({ embeds:[embed], components:[row] });
  }
};
