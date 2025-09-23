// commands/help.js
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Muestra la lista de comandos organizados por categoría"),
  
  async execute(interaction) {
    const categories = {
      "📊 Economía": [
        "`/ranking` - Ver el ranking de puntos",
        "`/shop` - Ver la tienda",
        "`/buy` - Comprar un ítem",
        "`/inventory` - Ver tu inventario",
        "`/achievements` - Ver tus logros"
      ],
      "⚔️ RPG": [
        "`/rpg` - Menú principal RPG",
        "`/rpgprofile` - Ver tu perfil RPG",
        "`/quest` - Aceptar una misión",
        "`/fight` - Luchar contra un enemigo"
      ],
      "🏰 Clanes": [
        "`/clan` - Menú principal de clanes",
        "`/createclan` - Crear un clan",
        "`/joinclan` - Unirse a un clan",
        "`/leaveclan` - Salir de un clan",
        "`/claninfo` - Ver info de un clan",
        "`/claninvite` - Invitar a un jugador"
      ],
      "🛠️ Roles": [
        "`/roles` - Menú para elegir roles",
        "`/roleadmin` - Configurar roles disponibles",
        "`/setchannel` - Configurar canal por defecto"
      ],
      "🎲 Juegos": [
        "`/games` - Menú de juegos",
        "`/coinflip` - Lanzar una moneda",
        "`/guess` - Adivina el número"
      ],
      "🎉 Diversión": [
        "`/meme` - Enviar un meme random",
        "`/quote` - Frases célebres",
        "`/gif` - Buscar un GIF"
      ],
      "🔨 Moderación": [
        "`/warn` - Advertir a un usuario",
        "`/warnings` - Ver advertencias",
        "`/mute` - Silenciar a un usuario"
      ]
    };

    // Embed inicial
    const embed = new EmbedBuilder()
      .setTitle("📖 Menú de Ayuda")
      .setDescription("Selecciona una categoría en el menú de abajo para ver sus comandos.")
      .setColor("Blue");

    // Menú de categorías
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("help_select")
      .setPlaceholder("Selecciona una categoría")
      .addOptions(
        Object.keys(categories).map(cat => ({
          label: cat,
          value: cat,
        }))
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });

    // Collector para manejar selección
    const collector = interaction.channel.createMessageComponentCollector({
      filter: i => i.customId === "help_select" && i.user.id === interaction.user.id,
      time: 60000
    });

    collector.on("collect", async i => {
      const selected = i.values[0];
      const cmds = categories[selected].join("\n");

      const embedCategory = new EmbedBuilder()
        .setTitle(selected)
        .setDescription(cmds)
        .setColor("Green");

      await i.update({ embeds: [embedCategory], components: [row] });
    });
  }
};
