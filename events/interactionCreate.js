
const fs = require('fs');
const path = require('path');
const rolesPath = path.join(__dirname, '../utils/rolesConfig.json');
const rpg = require('../utils/rpg');
const clans = require('../utils/clans');
const points = require('../utils/points');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    try {
      if (interaction.isButton && interaction.isButton()) {
        const id = interaction.customId;
        // Help buttons: help_btn_economy, help_btn_rpg, etc.
        if (id.startsWith('help_btn_')) {
          const cat = id.replace('help_btn_','').replace(/_/g,' ');
          const helpData = {
            "economy": [
              "`!ranking` - Show the ranking",
              "`!shop` - Open the shop",
              "`!buy` - Buy an item",
              "`!inventory` - Show your inventory",
              "`!achievements` - Show your achievements"
            ],
            "rpg": [
              "`!rpg` - RPG main menu",
              "`!rpgprofile` - View your RPG profile",
              "`!quest` - Accept a quest",
              "`!fight` - Fight an enemy"
            ],
            "clans": [
              "`!clan` - Clan menu",
              "`!createclan` - Create clan",
              "`!joinclan` - Join clan",
              "`!leaveclan` - Leave clan",
              "`!claninfo` - Clan info",
              "`!claninvite` - Invite member"
            ],
            "roles": [
              "`!roles` - Choose your role",
              "`!roleadmin` - Configure roles",
              "`!setchannel` - Set default channels"
            ],
            "games": [
              "`!games` - Games menu",
              "`!coinflip` - Flip a coin",
              "`!guess` - Guess number"
            ],
            "fun": [
              "`!meme` - Random meme",
              "`!quote` - Random quote",
              "`!gif` - Search GIF"
            ],
            "moderation": [
              "`!warn` - Warn user",
              "`!warnings` - Show warnings",
              "`!mute` - Mute user"
            ]
          };
          const list = helpData[cat] || ['No commands'];
          await interaction.update({ content: `**${cat.toUpperCase()}**\n` + list.join('\n'), embeds: [], components: [] });
          return;
        }

        // roleadmin button handled in interaction if any, but default reply
        if (id === 'roles_refresh') {
          await interaction.reply({ content: 'Refreshed roles config', ephemeral: true });
          return;
        }
      }

      if (interaction.isStringSelectMenu && interaction.isStringSelectMenu()) {
        const id = interaction.customId;
        if (id === 'roles_select') {
          const roleId = interaction.values[0];
          const role = interaction.guild.roles.cache.get(roleId);
          if (!role) return interaction.reply({ content: 'Role not found', ephemeral: true });
          // assign role, remove other configured roles
          try {
            const configured = JSON.parse(fs.readFileSync(rolesPath,'utf8')||'[]');
            const toRemove = configured.map(r=>r.id).filter(rid=>rid!==roleId);
            await interaction.member.roles.remove(toRemove).catch(()=>{});
          } catch(e){}
          await interaction.member.roles.add(role).catch(()=>{});
          return interaction.reply({ content: `You were given **${role.name}**`, ephemeral: true });
        }
      }
    } catch (err) {
      console.error('Interaction handler error:', err);
      try { if (!interaction.replied) interaction.reply({ content: 'Error handling interaction', ephemeral: true }); } catch(e){}
    }
  }
};
