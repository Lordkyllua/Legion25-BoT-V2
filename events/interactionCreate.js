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

            return interaction.reply({ 
                content: `✅ Roles configured: ${selectedRoles.map(r => r.name).join(", ")}`, 
                ephemeral: true 
            });
        }

        // Member role selection
        if (interaction.customId === "roles_select") {
            const roleId = interaction.values[0];
            const role = interaction.guild.roles.cache.get(roleId);

            if (!role) return interaction.reply({ content: "❌ Role not found.", ephemeral: true });

            await interaction.member.roles.add(role);
            return interaction.reply({ content: `🎭 You have been assigned the role **${role.name}**!`, ephemeral: true });
        }
    },
};
