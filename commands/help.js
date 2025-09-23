// commands/help.js
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Show all available commands organized by categories",
  
  async execute(message, args, client, prefix) {
    const categories = {
      "📊 Economy": [
        `\`${prefix}ranking\` - Show the ranking`,
        `\`${prefix}shop\` - Open the shop`,
        `\`${prefix}buy\` - Buy an item`,
        `\`${prefix}inventory\` - Show your inventory`,
        `\`${prefix}achievements\` - Show your achievements`
      ],
      "⚔️ RPG": [
        `\`${prefix}rpg\` - RPG main menu`,
        `\`${prefix}rpgprofile\` - View your RPG profile`,
        `\`${prefix}quest\` - Accept a quest`,
        `\`${prefix}fight\` - Fight an enemy`
      ],
      "🏰 Clans": [
        `\`${prefix}clan\` - Clan main menu`,
        `\`${prefix}createclan\` - Create a clan`,
        `\`${prefix}joinclan\` - Join a clan`,
        `\`${prefix}leaveclan\` - Leave your clan`,
        `\`${prefix}claninfo\` - View clan info`,
        `\`${prefix}claninvite\` - Invite a member`
      ],
      "🛠️ Roles": [
        `\`${prefix}roles\` - Choose your roles`,
        `\`${prefix}roleadmin\` - Configure available roles`,
        `\`${prefix}setchannel\` - Set a default channel`
      ],
      "🎲 Games": [
        `\`${prefix}games\` - Games main menu`,
        `\`${prefix}coinflip\` - Flip a coin`,
        `\`${prefix}guess\` - Guess the number`
      ],
      "🎉 Fun": [
        `\`${prefix}meme\` - Send a random meme`,
        `\`${prefix}quote\` - Random quote`,
        `\`${prefix}gif\` - Search a GIF`
      ],
      "🔨 Moderation": [
        `\`${prefix}warn\` - Warn a user`,
        `\`${prefix}warnings\` - Check user warnings`,
        `\`${prefix}mute\` - Mute a user`
      ]
    };

    // Embed inicial
    const embed = new EmbedBuilder()
      .setTitle("📖 Help Menu")
      .setDescription("Select a category below to view its commands.")
      .setColor("Blue");

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("help_select")
      .setPlaceholder("Choose a category")
      .addOptions(
        Object.keys(categories).map(cat => ({
          label: cat.replace(/[^a-zA-Z ]/g, ""), // el label solo texto
          emoji: cat.match(/[\p{Emoji}]/gu)?.[0] || null, // toma el emoji inicial si hay
          value: cat, // el value incluye emoji + texto
        }))
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const sent = await message.channel.send({ embeds: [embed], components: [row] });

    const collector = sent.createMessageComponentCollector({
      componentType: "STRING_SELECT",
      time: 60000
    });

    collector.on("collect", async i => {
      if (i.customId !== "help_select") return;

      if (i.user.id !== message.author.id) {
        return i.reply({ content: "⚠️ This menu is not for you.", ephemeral: true });
      }

      const selected = i.values[0];
      const cmds = categories[selected].join("\n");

      const embedCategory = new EmbedBuilder()
        .setTitle(selected)
        .setDescription(cmds)
        .setColor("Green");

      // importante para evitar "interacción fallida"
      await i.update({ embeds: [embedCategory], components: [row] });
    });

    collector.on("end", async () => {
      // deshabilitar menú al expirar
      const disabledRow = new ActionRowBuilder().addComponents(
        selectMenu.setDisabled(true)
      );
      await sent.edit({ components: [disabledRow] });
    });
  }
};
