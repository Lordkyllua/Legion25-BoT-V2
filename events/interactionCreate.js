
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
      // Buttons
      if (typeof interaction.isButton === 'function' && interaction.isButton()) {
        const id = interaction.customId;
        if (id.startsWith('help_btn_')) {
          const key = id.replace('help_btn_', '').replace(/_/g, '');
          const helpData = {
            'economy': ['`!ranking` - Show ranking', '`!shop` - View shop', '`!buy` - Buy item', '`!inventory` - Inventory'],
            'rpg': ['`!rpg` - RPG menu', '`!rpgprofile` - Show profile', '`!quest` - Do a quest', '`!fight` - Fight enemies'],
            'clans': ['`!clan` - Clan menu', '`!createclan` - Create', '`!joinclan` - Join', '`!claninfo` - Info'],
            'roles': ['`!roles` - Choose role', '`!roleadmin` - Configure roles', '`!setchannel` - Set channel'],
            'games': ['`!games` - Games menu', '`!coinflip` - Coinflip', '`!guess` - Guess number'],
            'fun': ['`!meme` - Meme', '`!quote` - Quote', '`!gif` - Gif'],
            'moderation': ['`!warn` - Warn user', '`!warnings` - Show warnings', '`!mute` - Mute user']
          };
          const list = helpData[key] || ['No commands found for this category'];
          // Update original help message with the list
          await interaction.update({ content: `**${key.toUpperCase()}**\n` + list.join('\n'), embeds: [], components: [] });
          return;
        }
        // Add other button handlers here if needed
        return;
      }

      // Select menus
      if (typeof interaction.isStringSelectMenu === 'function' && interaction.isStringSelectMenu()) {
        const id = interaction.customId;
        // Defer ephemeral to avoid timeout
        await interaction.deferReply({ ephemeral: true });

        if (id === 'roles_select') {
          const roleId = interaction.values[0];
          const role = interaction.guild.roles.cache.get(roleId);
          if (!role) return interaction.editReply({ content: '❌ Role not found' });
          try {
            const configured = JSON.parse(fs.readFileSync(rolesPath, 'utf8') || '[]');
            const toRemove = configured.map(r => r.id).filter(rid => rid !== roleId);
            await interaction.member.roles.remove(toRemove).catch(() => { });
          } catch (e) { /* ignore */ }
          await interaction.member.roles.add(role).catch(() => { });
          return interaction.editReply({ content: `✅ You were given **${role.name}**` });
        }

        if (id === 'rpg_select') {
          const choice = interaction.values[0];
          const uid = interaction.user.id;
          if (choice === 'profile') {
            const p = rpg.getProfile(uid);
            return interaction.editReply({ content: `📜 ${interaction.user.username} — Level ${p.level} — XP ${p.xp} — HP ${p.hp} — Gold ${p.gold}` });
          }
          if (choice === 'quests') {
            rpg.addXP(uid, 30); rpg.addGold(uid, 20);
            return interaction.editReply({ content: '📝 Quest completed: +30 XP, +20 gold' });
          }
          if (choice === 'fight') {
            const enemies = [{ name: 'Goblin', hp: 30, xp: 20, gold: 10 }, { name: 'Orc', hp: 60, xp: 40, gold: 30 }];
            const enemy = enemies[Math.floor(Math.random() * enemies.length)];
            const playerRoll = Math.floor(Math.random() * 30) + 10;
            const enemyRoll = Math.floor(Math.random() * 25) + 5;
            if (playerRoll >= enemyRoll) {
              rpg.addXP(uid, enemy.xp); rpg.addGold(uid, enemy.gold);
              return interaction.editReply({ content: `⚔️ You defeated ${enemy.name}! +${enemy.xp} XP, +${enemy.gold} gold` });
            } else {
              rpg.damagePlayer(uid, 40);
              return interaction.editReply({ content: `💥 You were defeated by ${enemy.name}... You lost HP.` });
            }
          }
          if (choice === 'levelup') {
            rpg.addXP(uid, 100);
            return interaction.editReply({ content: '⬆️ You gained XP and may have leveled up!' });
          }
        }

        if (id === 'games_select') {
          const choice = interaction.values[0];
          if (choice === 'dado') {
            const r = Math.floor(Math.random() * 6) + 1;
            return interaction.editReply({ content: `🎲 You rolled a **${r}**` });
          }
          if (choice === 'coinflip') {
            const res = Math.random() < 0.5 ? 'Heads' : 'Tails';
            return interaction.editReply({ content: `🪙 ${res}` });
          }
          if (choice === 'rps') return interaction.editReply({ content: 'Use `!games rps <rock|paper|scissors>`' });
          if (choice === 'guess') return interaction.editReply({ content: 'Use `!guess <number 1-10>`' });
          if (choice === 'meme') return interaction.editReply({ content: 'Use `!meme` to fetch a meme' });
          if (choice === 'quote') return interaction.editReply({ content: 'Use `!quote` to fetch a quote' });
        }

        return interaction.editReply({ content: 'Option received.' });
      }

    } catch (err) {
      console.error('Interaction handler error:', err);
      try {
        if (!interaction.replied && !interaction.deferred) await interaction.reply({ content: '❌ Error handling interaction', ephemeral: true });
        else if (interaction.deferred && !interaction.replied) await interaction.editReply({ content: '❌ Error handling interaction' });
      } catch (e) { console.error('Failed to send error reply', e); }
    }
  }
};
