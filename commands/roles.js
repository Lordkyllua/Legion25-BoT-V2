
const fs = require('fs');
const path = require('path');
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const rolesPath = path.join(__dirname, '../utils/rolesConfig.json');
module.exports = {
  name: 'roles',
  description: 'Self-assignable roles menu',
  async execute(message) {
    if (!fs.existsSync(rolesPath)) return message.reply('No roles configured. Ask admin to run !roleadmin');
    const configured = JSON.parse(fs.readFileSync(rolesPath,'utf8')||'[]');
    if (!configured.length) return message.reply('No roles available');
    const options = configured.map(r=>({ label: r.name, value: r.id }));
    const select = new StringSelectMenuBuilder().setCustomId('roles_select').setPlaceholder('Choose a role').addOptions(options);
    const row = new ActionRowBuilder().addComponents(select);
    const embed = new EmbedBuilder().setTitle('Choose Role').setDescription('Select a role to assign').setColor('Green');
    await message.reply({ embeds:[embed], components:[row] });
  }
};
