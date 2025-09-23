
const fs = require('fs');
const path = require('path');
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const rolesPath = path.join(__dirname, '../utils/rolesConfig.json');

module.exports = {
  name: 'roles',
  description: 'Let members choose a role',
  async execute(message) {
    if (!fs.existsSync(rolesPath)) return message.reply('⚠️ No roles configured. Ask an admin to use !roleadmin');
    const configured = JSON.parse(fs.readFileSync(rolesPath,'utf8')||'[]');
    if (!configured.length) return message.reply('⚠️ No roles available for self-assignment.');
    const options = configured.map(r=>({ label: r.name, value: r.id }));
    const select = new StringSelectMenuBuilder().setCustomId('roles_select').setPlaceholder('Choose a role').addOptions(options);
    const row = new ActionRowBuilder().addComponents(select);
    const embed = new EmbedBuilder().setTitle('🎭 Choose Your Role').setDescription('Select a role from the menu').setColor('Green');
    message.reply({ embeds:[embed], components:[row] });
  }
};
