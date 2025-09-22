const fs = require("fs");
const path = require("path");
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require("discord.js");

const rolesPath = path.join(__dirname, "../utils/rolesConfig.json");

module.exports = {
    name: "roles",
    description: "Let members choose a role",
    async execute(message) {
        if (!fs.existsSync(rolesPath)) return message.reply("⚠️ No roles configured. Ask an admin to use `!roleadmin`.");

        const configuredRoles = JSON.parse(fs.readFileSync(rolesPath, "utf8"));
        if (configuredRoles.length === 0) return message.reply("⚠️ No roles available for self-assignment.");

        const options = configuredRoles.map(role => ({
            label: role.name,
            value: role.id
        }));

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("roles_select")
            .setPlaceholder("Choose your role")
            .addOptions(options);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const embed = new EmbedBuilder()
            .setTitle("🎭 Choose Your Role")
            .setDescription("Select a role from the menu below.")
            .setColor("Green");

        message.channel.send({ embeds: [embed], components: [row] });
    },
};
