const fs = require('fs');
const path = require('path');
const rolesPath = path.join(__dirname, '../utils/rolesConfig.json');
const points = require('../utils/points');
const rpg = require('../utils/rpg');
const clans = require('../utils/clans');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    try {
      if (!interaction.isStringSelectMenu()) return;
      // Role admin select
      if (interaction.customId === 'roleadmin_select') {
        const selected = interaction.values.map(id => {
          const role = interaction.guild.roles.cache.get(id);
          return { id: role.id, name: role.name };
        });
        fs.writeFileSync(rolesPath, JSON.stringify(selected, null, 2));
        return interaction.reply({ content: `✅ Configured roles: ${selected.map(s=>s.name).join(', ')}`, ephemeral: true });
      }

      // Member role select
      if (interaction.customId === 'roles_select') {
        const roleId = interaction.values[0];
        const role = interaction.guild.roles.cache.get(roleId);
        if (!role) return interaction.reply({ content: '❌ Role not found', ephemeral: true });
        await interaction.member.roles.add(role);
        return interaction.reply({ content: `🎭 You got **${role.name}**`, ephemeral: true });
      }

      // RPG menu
      if (interaction.customId === 'rpg_select') {
        const choice = interaction.values[0];
        const userId = interaction.user.id;
        if (choice === 'profile') {
          const p = rpg.getProfile(userId);
          return interaction.reply({ content: `📜 ${interaction.user.username} - Level ${p.level} - XP ${p.xp} - HP ${p.hp} - Gold ${p.gold}`, ephemeral: true });
        }
        if (choice === 'quests') {
          rpg.addXP(userId, 30);
          rpg.addGold(userId, 20);
          return interaction.reply({ content: '📝 Quest done: +30 XP, +20 gold', ephemeral: true });
        }
        if (choice === 'fight') {
          const enemies = [{name:'Goblin',hp:30,xp:20,gold:10},{name:'Orc',hp:60,xp:40,gold:30}];
          const enemy = enemies[Math.floor(Math.random()*enemies.length)];
          const playerRoll = Math.floor(Math.random()*30)+10;
          const enemyRoll = Math.floor(Math.random()*25)+5;
          if (playerRoll >= enemyRoll) {
            rpg.addXP(userId, enemy.xp);
            rpg.addGold(userId, enemy.gold);
            return interaction.reply({ content: `⚔️ You defeated ${enemy.name}! +${enemy.xp} XP, +${enemy.gold} gold`, ephemeral: true });
          } else {
            rpg.damagePlayer(userId, 40);
            return interaction.reply({ content: `💥 You were defeated by ${enemy.name}... You lost HP.`, ephemeral: true });
          }
        }
        if (choice === 'levelup') {
          rpg.addXP(userId, 100);
          return interaction.reply({ content: '⬆️ You gained XP and may have leveled up!', ephemeral: true });
        }
      }

      // Clan menu
      if (interaction.customId === 'clan_select') {
        const choice = interaction.values[0];
        const userId = interaction.user.id;
        if (choice === 'create') return interaction.reply({ content: 'Use command: !createclan <name>', ephemeral: true });
        if (choice === 'join') return interaction.reply({ content: 'Use command: !joinclan <name>', ephemeral: true });
        if (choice === 'leave') {
          const res = clans.leaveClan(userId);
          return interaction.reply({ content: res.ok ? '✅ You left the clan' : '❌ ' + (res.msg||'Error'), ephemeral: true });
        }
        if (choice === 'info') return interaction.reply({ content: 'Use command: !claninfo <name>', ephemeral: true });
        if (choice === 'invite') return interaction.reply({ content: 'Use command: !claninvite @user', ephemeral: true });
      }

      // Games menu
      if (interaction.customId === 'games_select') {
        const choice = interaction.values[0];
        if (choice === 'dice') {
          const r = Math.floor(Math.random()*6)+1;
          return interaction.reply({ content: `🎲 You rolled: **${r}**`, ephemeral: true });
        }
        if (choice === 'rps') return interaction.reply({ content: 'Use: !games rps <rock|paper|scissors>', ephemeral: true });
        if (choice === 'coinflip') { const res = Math.random()<0.5?'Heads':'Tails'; return interaction.reply({ content: `🪙 ${res}`, ephemeral: true }); }
        if (choice === 'guess') return interaction.reply({ content: 'Use: !games guess <1-10>', ephemeral: true });
        if (choice === 'meme') return interaction.reply({ content: 'Fetching meme...', ephemeral: true });
        if (choice === 'quote') return interaction.reply({ content: 'Fetching quote...', ephemeral: true });
        if (choice === 'gif') return interaction.reply({ content: 'Use: !games gif <keyword>', ephemeral: true });
      }

    } catch (err) {
      console.error('Interaction handler error:', err);
      try { if (!interaction.replied) interaction.reply({ content: '❌ Error handling interaction', ephemeral: true }); } catch(e) {}
    }
  }
};
