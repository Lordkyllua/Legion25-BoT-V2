
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'games',
  description: 'Games menu',
  execute(message) {
    const options = [
      { label:'Dice (roll)', value:'dado' },
      { label:'Rock Paper Scissors', value:'rps' },
      { label:'Coinflip', value:'coinflip' },
      { label:'Guess (1-10)', value:'guess' },
      { label:'Meme', value:'meme' },
      { label:'Quote', value:'quote' },
      { label:'Gif', value:'gif' }
    ];
    const select = new StringSelectMenuBuilder().setCustomId('games_select').setPlaceholder('Choose a game').addOptions(options);
    const row = new ActionRowBuilder().addComponents(select);
    const embed = new EmbedBuilder().setTitle('🎮 Games').setDescription('Choose a mini-game').setColor('Green');
    message.reply({ embeds:[embed], components:[row] });
  }
};
