const fs = require("fs");
const path = require("path");
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

const rolesPath = path.join(__dirname, "../utils/rolesConfig.json");

module.exports = {
    name: "roleadmin",
    description: "Configure which roles are available for members",
    async execute(message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.reply("❌ You don’t have permission to use this command.");
        }

        const guildRoles = message.guild.roles.cache
            .filter(role => role.name !== "@everyone")
            .map(role => ({
                label: role.name,
                value: role.id
            }));

        if (guildRoles.length === 0) return message.reply("⚠️ No roles available in this server.");

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("roleadmin_select")
            .setPlaceholder("Select roles members can assign")
            .setMinValues(1)
            .setMaxValues(guildRoles.length)
            .addOptions(guildRoles);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const embed = new EmbedBuilder()
            .setTitle("⚙️ Role Configuration")
            .setDescription("Select the roles members can assign to themselves.")
            .setColor("Orange");

        message.channel.send({ embeds: [embed], components: [row] });
    },
};
