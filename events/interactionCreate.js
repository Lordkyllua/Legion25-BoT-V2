
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
      if (interaction.isStringSelectMenu && interaction.isStringSelectMenu()) {
        const id = interaction.customId;
        if (id === 'roleadmin_select') {
          const selected = interaction.values.map(v=>{
            const r = interaction.guild.roles.cache.get(v);
            return r ? { id: r.id, name: r.name } : null;
          }).filter(Boolean);
          fs.writeFileSync(rolesPath, JSON.stringify(selected, null, 2));
          return interaction.reply({ content: `✅ Configured roles: ${selected.map(s=>s.name).join(', ')}`, ephemeral: true });
        }
        if (id === 'roles_select') {
          const roleId = interaction.values[0];
          const role = interaction.guild.roles.cache.get(roleId);
          if (!role) return interaction.reply({ content: '❌ Role not found', ephemeral: true });
          try {
            const configured = JSON.parse(fs.readFileSync(rolesPath,'utf8')||'[]');
            const toRemove = configured.map(r=>r.id).filter(rid=>rid!==roleId);
            await interaction.member.roles.remove(toRemove).catch(()=>{});
          } catch(e){}
          await interaction.member.roles.add(role).catch(()=>{});
          return interaction.reply({ content: `🎭 You have been given **${role.name}**`, ephemeral: true });
        }
        if (id === 'rpg_select') {
          const choice = interaction.values[0];
          const uid = interaction.user.id;
          if (choice === 'profile') {
            const p = rpg.getProfile(uid);
            return interaction.reply({ content: `📜 ${interaction.user.username} — Level ${p.level} — XP ${p.xp} — HP ${p.hp} — Gold ${p.gold}`, ephemeral: true });
          }
          if (choice === 'quests') {
            rpg.addXP(uid, 30); rpg.addGold(uid, 20);
            return interaction.reply({ content: '📝 Quest completed: +30 XP, +20 gold', ephemeral: true });
          }
          if (choice === 'fight') {
            const enemies = [{name:'Goblin',hp:30,xp:20,gold:10},{name:'Orc',hp:60,xp:40,gold:30}];
            const enemy = enemies[Math.floor(Math.random()*enemies.length)];
            const playerRoll = Math.floor(Math.random()*30)+10;
            const enemyRoll = Math.floor(Math.random()*25)+5;
            if (playerRoll >= enemyRoll) {
              rpg.addXP(uid, enemy.xp); rpg.addGold(uid, enemy.gold);
              return interaction.reply({ content: `⚔️ You defeated ${enemy.name}! +${enemy.xp} XP, +${enemy.gold} gold`, ephemeral: true });
            } else {
              rpg.damagePlayer(uid, 40);
              return interaction.reply({ content: `💥 You were defeated by ${enemy.name}... You lost HP.`, ephemeral: true });
            }
          }
          if (choice === 'levelup') {
            rpg.addXP(uid, 100);
            return interaction.reply({ content: '⬆️ You gained XP and may have leveled up!', ephemeral: true });
          }
        }
        if (id === 'clan_select') {
          const choice = interaction.values[0];
          const uid = interaction.user.id;
          if (choice === 'leave') {
            const res = clans.leaveClan(uid);
            return interaction.reply({ content: res.ok ? '✅ You left the clan' : '❌ '+(res.msg||'Error'), ephemeral: true });
          }
          return interaction.reply({ content: 'Use the clan commands: !createclan, !joinclan, !claninfo, !claninvite', ephemeral: true });
        }
        if (id === 'games_select') {
          const choice = interaction.values[0];
          if (choice === 'dado') {
            const r = Math.floor(Math.random()*6)+1;
            return interaction.reply({ content: `🎲 You rolled a **${r}**`, ephemeral: true });
          }
          if (choice === 'coinflip') {
            const res = Math.random()<0.5 ? 'Heads' : 'Tails';
            return interaction.reply({ content: `🪙 ${res}`, ephemeral: true });
          }
          if (choice === 'rps') return interaction.reply({ content: 'Use !games rps <rock|paper|scissors>', ephemeral: true });
          if (choice === 'guess') return interaction.reply({ content: 'Use !guess <number 1-10>', ephemeral: true });
          if (choice === 'meme') return interaction.reply({ content: 'Use !meme to fetch a meme', ephemeral: true });
          if (choice === 'quote') return interaction.reply({ content: 'Use !quote to fetch a quote', ephemeral: true });
        }
      }
    } catch (err) {
      console.error('Interaction handler error:', err);
      try { if (!interaction.replied) interaction.reply({ content: '❌ Error handling interaction', ephemeral: true }); } catch(e){}
    }
  }
};
