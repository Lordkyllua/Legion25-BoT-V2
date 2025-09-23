
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'games',
  description: 'Games menu',
  execute(message) {
    const options = [
      { label:'Dice', value:'dado' },
      { label:'Rock Paper Scissors', value:'rps' },
      { label:'Coinflip', value:'coinflip' },
      { label:'Guess', value:'guess' }
    ];
    const select = new StringSelectMenuBuilder().setCustomId('games_select').setPlaceholder('Choose a game').addOptions(options);
    const row = new ActionRowBuilder().addComponents(select);
    const embed = new EmbedBuilder().setTitle('Games').setDescription('Pick a mini-game').setColor('Purple');
    message.reply({ embeds:[embed], components:[row] });
  }
};
