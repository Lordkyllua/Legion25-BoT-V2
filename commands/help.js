
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Interactive help menu (buttons)',
  async execute(message, args, client, prefix) {
    const embed = new EmbedBuilder()
      .setTitle('📖 Help - Legion25 Bot')
      .setDescription('Click a button to view commands in a category.')
      .setColor('Blue');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('help_btn_economy').setLabel('Economy').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('help_btn_rpg').setLabel('RPG').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('help_btn_clans').setLabel('Clans').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('help_btn_roles').setLabel('Roles').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('help_btn_games').setLabel('Games').setStyle(ButtonStyle.Success)
    );
    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('help_btn_fun').setLabel('Fun').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('help_btn_moderation').setLabel('Moderation').setStyle(ButtonStyle.Danger)
    );

    const sent = await message.channel.send({ embeds:[embed], components:[row,row2] });

    // set timeout to disable buttons after 60s
    setTimeout(async ()=>{
      try {
        const disabledRow = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId('help_btn_economy').setLabel('Economy').setStyle(ButtonStyle.Primary).setDisabled(true),
          new ButtonBuilder().setCustomId('help_btn_rpg').setLabel('RPG').setStyle(ButtonStyle.Primary).setDisabled(true),
          new ButtonBuilder().setCustomId('help_btn_clans').setLabel('Clans').setStyle(ButtonStyle.Primary).setDisabled(true),
          new ButtonBuilder().setCustomId('help_btn_roles').setLabel('Roles').setStyle(ButtonStyle.Secondary).setDisabled(true),
          new ButtonBuilder().setCustomId('help_btn_games').setLabel('Games').setStyle(ButtonStyle.Success).setDisabled(true)
        );
        const disabledRow2 = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId('help_btn_fun').setLabel('Fun').setStyle(ButtonStyle.Secondary).setDisabled(true),
          new ButtonBuilder().setCustomId('help_btn_moderation').setLabel('Moderation').setStyle(ButtonStyle.Danger).setDisabled(true)
        );
        await sent.edit({ components:[disabledRow, disabledRow2] });
      } catch(e){}
    }, 60000);
  }
};
