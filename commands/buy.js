
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const store = require('../store.json');
module.exports = { name:'buy', description:'Buy item menu', async execute(message) {
  const select = new StringSelectMenuBuilder().setCustomId(`buy_item_${message.author.id}`).setPlaceholder('Select item').addOptions(store.map(i=>({ label:`${i.name} - ${i.price} gold`, description:i.description, value:i.name })));
  const row = new ActionRowBuilder().addComponents(select);
  const embed = new EmbedBuilder().setTitle('Shop').setDescription(`You have gold in your RPG account. Choose an item to buy.`).setColor(0xFFD700);
  await message.reply({ embeds:[embed], components:[row] });
} };