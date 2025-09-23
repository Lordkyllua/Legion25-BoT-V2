
const fs = require('fs');
const path = require('path');
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const rolesPath = path.join(__dirname, '../utils/rolesConfig.json');
module.exports = {
  name: 'roleadmin',
  description: 'Configure which roles members can self-assign',
  async execute(message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return message.reply('You need Manage Roles permission');
    const guildRoles = message.guild.roles.cache.filter(r=>r.name!=='@everyone').map(r=>({ label: r.name, value: r.id }));
    if (!guildRoles.length) return message.reply('No roles found');
    const select = new StringSelectMenuBuilder().setCustomId('roleadmin_select').setPlaceholder('Select allowed roles').setMinValues(1).setMaxValues(guildRoles.length).addOptions(guildRoles);
    const row = new ActionRowBuilder().addComponents(select);
    const embed = new EmbedBuilder().setTitle('Role Admin').setDescription('Select roles members can assign').setColor('Orange');
    await message.reply({ embeds:[embed], components:[row] });
  }
};
