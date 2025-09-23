
const store = require('../store.json');
const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'shop',
  description: 'Show shop items',
  execute(message) {
    const embed = new EmbedBuilder().setTitle('🛒 Shop');
    for (const [id, item] of Object.entries(store)) {
      embed.addFields({ name: id, value: `${item.price} coins — ${item.description}` });
    }
    message.reply({ embeds:[embed] });
  }
};
