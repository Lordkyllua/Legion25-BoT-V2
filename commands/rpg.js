const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "rpg",
    description: "Open the RPG menu with options to choose",
    async execute(message) {
        const options = [
            { label: "View Profile", value: "profile" },
            { label: "Quests", value: "quests" },
            { label: "Fight", value: "fight" },
            { label: "Level Up", value: "levelup" },
        ];

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("rpg_select")
            .setPlaceholder("Choose an RPG action")
            .addOptions(options);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const embed = new EmbedBuilder()
            .setTitle("⚔️ RPG Menu")
            .setDescription("Select an action from the menu below to interact with your RPG character.")
            .setColor("Purple");

        message.channel.send({ embeds: [embed], components: [row] });
    },
};
