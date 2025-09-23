
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
      // Buttons -> help categories (reply ephemeral)
      if (typeof interaction.isButton === 'function' && interaction.isButton()) {
        const id = interaction.customId;
        if (id.startsWith('help_')) {
          const maps = {
            'help_games': { title: '🎮 Games Commands', color: 0xFFD700, fields: [{name:'!coinflip',value:'Flip a coin',inline:true},{name:'!guess',value:'Guess a number',inline:true},{name:'!games',value:'Games menu',inline:true}]},
            'help_rpg': { title: '⚔️ RPG Commands', color: 0xFF4500, fields: [{name:'!rpg',value:'Open RPG menu',inline:true},{name:'!rpgprofile',value:'Show RPG profile',inline:true},{name:'!quest',value:'Do a quest',inline:true}]},
            'help_clans': { title: '👥 Clan Commands', color: 0x32CD32, fields: [{name:'!createclan',value:'Create a clan',inline:true},{name:'!joinclan',value:'Join a clan',inline:true},{name:'!claninfo',value:'Clan info',inline:true}]},
            'help_shop': { title: '📊 Points & Shop', color: 0x1E90FF, fields: [{name:'!ranking',value:'Show top players',inline:true},{name:'!shop',value:'Show shop items',inline:true},{name:'!buy',value:'Buy an item',inline:true}]},
            'help_moderation': { title: '🛠️ Moderation', color: 0xDC143C, fields: [{name:'!warn',value:'Warn a user',inline:true},{name:'!warnings',value:'Show warnings',inline:true},{name:'!mute',value:'Mute a user',inline:true}]}
          };
          const m = maps[id];
          if (!m) return interaction.reply({ content: 'Category not found', ephemeral: true });
          const { EmbedBuilder } = require('discord.js');
          const embed = new EmbedBuilder().setTitle(m.title).setColor(m.color).addFields(m.fields);
          return interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }

      // Select menus -> defer + editReply
      if (typeof interaction.isStringSelectMenu === 'function' && interaction.isStringSelectMenu()) {
        const id = interaction.customId;
        await interaction.deferReply({ ephemeral: true });

        // roleadmin select - only allow the user who opened message? we just save selection when admin selects
        if (id === 'roleadmin_select') {
          // Save selected role IDs and names into utils/rolesConfig.json
          const values = interaction.values; // array of role IDs
          const guild = interaction.guild;
          const rolesData = values.map(id => {
            const r = guild.roles.cache.get(id);
            return r ? { id: r.id, name: r.name } : null;
          }).filter(Boolean);
          fs.writeFileSync(rolesPath, JSON.stringify(rolesData, null, 2));
          return interaction.editReply({ content: `Saved ${rolesData.length} self-assignable roles.` });
        }

        if (id === 'roles_select') {
          const roleId = interaction.values[0];
          const role = interaction.guild.roles.cache.get(roleId);
          if (!role) return interaction.editReply({ content: 'Role not found' });
          try {
            const configured = JSON.parse(fs.readFileSync(rolesPath,'utf8')||'[]');
            const toRemove = configured.map(r=>r.id).filter(rid=>rid!==roleId);
            await interaction.member.roles.remove(toRemove).catch(()=>{});
          } catch(e){}
          await interaction.member.roles.add(role).catch(()=>{});
          return interaction.editReply({ content: `You were given **${role.name}**` });
        }

        if (id === 'rpg_select') {
          const choice = interaction.values[0];
          const uid = interaction.user.id;
          if (choice === 'profile') {
            const p = rpg.getProfile(uid);
            return interaction.editReply({ content: `📜 ${interaction.user.username} — Level ${p.level} — XP ${p.xp} — HP ${p.hp} — Gold ${p.gold}` });
          }
          if (choice === 'quests') { rpg.addXP(uid,30); rpg.addGold(uid,20); return interaction.editReply({ content: '📝 Quest completed: +30 XP, +20 gold' }); }
          if (choice === 'fight') {
            const enemies = [{name:'Goblin',hp:30,xp:20,gold:10},{name:'Orc',hp:60,xp:40,gold:30}];
            const enemy = enemies[Math.floor(Math.random()*enemies.length)];
            const playerRoll = Math.floor(Math.random()*30)+10;
            const enemyRoll = Math.floor(Math.random()*25)+5;
            if (playerRoll >= enemyRoll) { rpg.addXP(uid, enemy.xp); rpg.addGold(uid, enemy.gold); return interaction.editReply({ content: `⚔️ You defeated ${enemy.name}! +${enemy.xp} XP, +${enemy.gold} gold` }); }
            else { rpg.damagePlayer(uid,40); return interaction.editReply({ content: `💥 You were defeated by ${enemy.name}... You lost HP.` }); }
          }
          if (choice === 'levelup') { rpg.addXP(uid,100); return interaction.editReply({ content: '⬆️ You gained XP and may have leveled up!' }); }
        }

        if (id === 'games_select') {
          const choice = interaction.values[0];
          if (choice === 'dado') { const r = Math.floor(Math.random()*6)+1; return interaction.editReply({ content: `🎲 You rolled a **${r}**` }); }
          if (choice === 'coinflip') { const res = Math.random()<0.5 ? 'Heads' : 'Tails'; return interaction.editReply({ content: `🪙 ${res}` }); }
          if (choice === 'guess') return interaction.editReply({ content: 'Use `!guess <1-10>`' });
        }

        return interaction.editReply({ content: 'Option received.' });
      }

    } catch (err) {
      console.error('Interaction handler error:', err);
      try {
        if (!interaction.replied && !interaction.deferred) await interaction.reply({ content: 'Error handling interaction', ephemeral: true });
        else if (interaction.deferred && !interaction.replied) await interaction.editReply({ content: 'Error handling interaction' });
      } catch (e) { console.error('Failed to send error reply', e); }
    }
  }
};
