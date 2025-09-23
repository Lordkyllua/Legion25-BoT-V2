
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Show available commands and categories',
  async execute(message, args, client, prefix) {
    const embed = new EmbedBuilder()
      .setTitle('📖 Legion25 Bot - Help')
      .setDescription('Quick list of available commands. Click a button to get detailed info (ephemeral).')
      .addFields(
        { name: 'Games', value: '`!coinflip`, `!guess`, `!meme`, `!quote`, `!gif`' },
        { name: 'RPG', value: '`!rpg` (menu), `!rpgprofile`, `!quest`, `!fight`, `!inventory`' },
        { name: 'Clans', value: '`!createclan`, `!joinclan`, `!leaveclan`, `!claninfo`, `!claninvite`' },
        { name: 'Economy', value: '`!ranking`, `!shop`, `!buy`, `!daily`' },
        { name: 'Moderation', value: '`!warn`, `!warnings`, `!mute`, `!setchannel`' },
        { name: 'Roles', value: '`!roles`, `!roleadmin`' }
      )
      .setColor(0x00AAFF)
      .setFooter({ text: 'Developed by LordK' });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('help_games').setLabel('Games').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('help_rpg').setLabel('RPG').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('help_clans').setLabel('Clans').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('help_shop').setLabel('Points & Shop').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('help_moderation').setLabel('Moderation').setStyle(ButtonStyle.Danger)
    );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
};
