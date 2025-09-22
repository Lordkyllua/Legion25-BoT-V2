const fs = require("fs");
const path = require("path");
const rolesPath = path.join(__dirname, "../utils/rolesConfig.json");

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        // Admin role selection
        if (interaction.customId === "roleadmin_select") {
            const selectedRoles = interaction.values.map(roleId => {
                const role = interaction.guild.roles.cache.get(roleId);
                return { id: role.id, name: role.name };
            });

            fs.writeFileSync(rolesPath, JSON.stringify(selectedRoles, null, 2));
            return interaction.reply({ content: `✅ Roles configured: ${selectedRoles.map(r => r.name).join(", ")}`, ephemeral: true });
        }

        // Member role selection
        if (interaction.customId === "roles_select") {
            const roleId = interaction.values[0];
            const role = interaction.guild.roles.cache.get(roleId);
            if (!role) return interaction.reply({ content: "❌ Role not found.", ephemeral: true });
            await interaction.member.roles.add(role);
            return interaction.reply({ content: `🎭 You have been assigned **${role.name}**!`, ephemeral: true });
        }

        // RPG menu selection
        if (interaction.customId === "rpg_select") {
            const choice = interaction.values[0];

            switch (choice) {
                case "profile":
                    return interaction.reply({ content: "🧙‍♂️ Showing your RPG profile...", ephemeral: true });
                case "quests":
                    return interaction.reply({ content: "🗺️ Showing available quests...", ephemeral: true });
                case "fight":
                    return interaction.reply({ content: "⚔️ Preparing a fight...", ephemeral: true });
                case "levelup":
                    return interaction.reply({ content: "⬆️ Leveling up your character...", ephemeral: true });
                default:
                    return interaction.reply({ content: "❌ Unknown RPG option.", ephemeral: true });
            }
        }

        // Aquí puedes agregar menús de Clan o Juegos de la misma forma
    },
};
