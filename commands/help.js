const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Show all available commands",
    execute(message) {
        const embed = new EmbedBuilder()
            .setTitle("📜 Legion 25 Bot Commands")
            .setColor("Aqua")
            .setDescription("Here are all available commands, grouped by category:")
            .addFields(
                {
                    name: "🎮 Games",
                    value: "`!games` → Open the games menu. Options: dice, rock-paper-scissors, coinflip, guess, memes, gifs, quotes.",
                },
                {
                    name: "⚔️ RPG",
                    value: "`!rpg` → Open the RPG menu with options: profile, quests, fights, level up.",
                },
                {
                    name: "🏰 Clans",
                    value: "`!clan` → Clan menu. Options: create, join, leave, invite, info.",
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
                    value: "`!roleadmin` → Admins select which roles members can assign.\n" +
                           "`!roles` → Members choose one of the allowed roles from a menu.",
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
