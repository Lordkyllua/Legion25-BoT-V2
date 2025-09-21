const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Show all available commands",
    execute(message) {
        const embed = new EmbedBuilder()
            .setTitle("📜 Command List")
            .setColor("Aqua")
            .setDescription("Here are all available commands, organized by category:")
            .addFields(
                {
                    name: "🎮 Games",
                    value: "`!juegos` → Open the games menu (dice, rock-paper-scissors, coinflip, guess, memes, gifs, quotes).",
                },
                {
                    name: "⚔️ RPG",
                    value: "`!rpg` → Open the RPG menu (profile, quests, fights).",
                },
                {
                    name: "🏰 Clans",
                    value: "`!clan` → Clan menu (create, join, leave, invite, info).",
                },
                {
                    name: "💰 Economy",
                    value: "`!daily`, `!shop`, `!buy`, `!inventory`, `!achievements`, `!ranking`.",
                },
                {
                    name: "👤 Moderation",
                    value: "`!warn`, `!warnings`, `!mute`.",
                },
                {
                    name: "🎭 Roles",
                    value: "`!roleadmin` → Admins select which roles members can assign to themselves.\n" +
                           "`!roles` → Members choose one of the allowed roles and assign it to themselves.",
                },
                {
                    name: "⚙️ Setup",
                    value: "`!setchannel` → Configure channels for welcome, roles, or games.",
                }
            )
            .setFooter({ text: "🤖 Developed by LordK | Inspired by Tiny Survivors" });

        message.channel.send({ embeds: [embed] });
    },
};
