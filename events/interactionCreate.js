
const fs = require('fs');
const path = require('path');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const store = require('../store.json');
const rolesConfigPath = path.join(__dirname, '../utils/rolesConfig.json');
const rpg = require('../utils/rpg');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    try {
      if (interaction.isButton?.()) {
        const id = interaction.customId;
        if (id.startsWith('help_')) {
          const maps = {
            'help_games': { title: 'Games', fields: ['!games - open games menu','!coinflip','!guess'] },
            'help_rpg': { title: 'RPG', fields: ['!rpg - open rpg menu','!rpgprofile','!quest','!fight'] },
            'help_clans': { title: 'Clans', fields: ['!createclan','!joinclan','!leaveclan','!claninfo'] },
            'help_shop': { title: 'Shop', fields: ['!shop','!buy','!inventory','!ranking'] },
            'help_moderation': { title: 'Moderation', fields: ['!warn','!warnings','!mute','!setchannel'] }
          };
          const m = maps[id];
          if(!m) return interaction.reply({ content: 'Unknown category', ephemeral: true });
          const { EmbedBuilder } = require('discord.js');
          const embed = new EmbedBuilder().setTitle(m.title).setDescription(m.fields.join('\n')).setColor(0x00AAFF);
          return interaction.reply({ embeds:[embed], ephemeral:true });
        }
      }

      if (interaction.isStringSelectMenu?.()) {
        const id = interaction.customId;
        await interaction.deferReply({ ephemeral: true });

        if (id.startsWith('buy_item_')) {
          const ownerId = id.split('_')[2];
          if (interaction.user.id !== ownerId) return interaction.editReply({ content: "❌ You cannot use this menu.", ephemeral:true });
          const itemName = interaction.values[0];
          const item = store.find(i=>i.name===itemName);
          if(!item) return interaction.editReply({ content: 'Item not found.' });
          const confirmRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`confirm_buy_${interaction.user.id}_${item.name}`).setLabel('Confirm').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`cancel_buy_${interaction.user.id}`).setLabel('Cancel').setStyle(ButtonStyle.Danger)
          );
          await interaction.editReply({ content: `Are you sure you want to buy **${item.name}** for ${item.price} gold?`, components:[confirmRow] });

          const filter = i => i.user.id === interaction.user.id && (i.customId.startsWith(`confirm_buy_${interaction.user.id}`) || i.customId.startsWith(`cancel_buy_${interaction.user.id}`));
          const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30_000 });

          collector.on('collect', async i => {
            if (i.customId.startsWith(`confirm_buy_${interaction.user.id}`)) {
              const user = rpg.getUserData(i.user.id);
              if (user.gold < item.price) {
                await i.update({ content: `❌ Not enough gold. You have ${user.gold}.`, components: [] });
                collector.stop();
                return;
              }
              user.gold -= item.price;
              user.inventory.push(item.name);
              rpg.saveUserData(i.user.id, user);
              await i.update({ content: `✅ Purchase complete: **${item.name}**.`, components: [] });
              collector.stop();
            } else if (i.customId.startsWith(`cancel_buy_${interaction.user.id}`)) {
              await i.update({ content: '❌ Purchase cancelled.', components: [] });
              collector.stop();
            }
          });

          collector.on('end', async collected => {
            if (collected.size === 0) {
              try { await interaction.editReply({ content: '⌛ Interaction expired (no confirmation).', components: [] }); } catch(e){} 
            }
          });

          return;
        }

        if (id.startsWith('roles_select_')) {
          const ownerId = id.split('_')[2];
          if (interaction.user.id !== ownerId) return interaction.editReply({ content: "❌ You cannot use this menu.", ephemeral:true });
          const roleId = interaction.values[0];
          const role = interaction.guild.roles.cache.get(roleId);
          if(!role) return interaction.editReply({ content: 'Role not found.' });
          const confirmRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`confirm_role_${interaction.user.id}_${roleId}`).setLabel('Confirm').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`cancel_role_${interaction.user.id}`).setLabel('Cancel').setStyle(ButtonStyle.Danger)
          );
          await interaction.editReply({ content: `Assign role **${role.name}** to yourself?`, components:[confirmRow] });

          const filter = i => i.user.id === interaction.user.id && (i.customId.startsWith(`confirm_role_${interaction.user.id}`) || i.customId.startsWith(`cancel_role_${interaction.user.id}`));
          const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30_000 });

          collector.on('collect', async i => {
            if (i.customId.startsWith(`confirm_role_${interaction.user.id}`)) {
              try {
                const configured = JSON.parse(fs.readFileSync(rolesConfigPath,'utf8')||'[]');
                const other = configured.map(r=>r.id).filter(r=>r!==roleId);
                await i.member.roles.remove(other).catch(()=>{});
              } catch(e){}
              await i.member.roles.add(role).catch(()=>{});
              await i.update({ content: `✅ You were given **${role.name}**.`, components: [] });
              collector.stop();
            } else {
              await i.update({ content: '❌ Cancelled.', components: [] });
              collector.stop();
            }
          });

          collector.on('end', async collected => {
            if (collected.size === 0) {
              try { await interaction.editReply({ content: '⌛ Interaction expired (no confirmation).', components: [] }); } catch(e){} 
            }
          });
          return;
        }

        if (id.startsWith('roleadmin_select_')) {
          const ownerId = id.split('_')[2];
          if (interaction.user.id !== ownerId) return interaction.editReply({ content: "❌ You cannot use this menu.", ephemeral:true });
          const values = interaction.values;
          const guild = interaction.guild;
          const rolesData = values.map(id=>{ const r = guild.roles.cache.get(id); return r?{id:r.id,name:r.name}:null; }).filter(Boolean);
          const confirmRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`confirm_roleadmin_${interaction.user.id}`).setLabel('Save').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`cancel_roleadmin_${interaction.user.id}`).setLabel('Cancel').setStyle(ButtonStyle.Danger)
          );
          await interaction.editReply({ content: `Save ${rolesData.length} roles as self-assignable?`, components:[confirmRow] });

          const filter = i => i.user.id === interaction.user.id && (i.customId.startsWith(`confirm_roleadmin_${interaction.user.id}`) || i.customId.startsWith(`cancel_roleadmin_${interaction.user.id}`));
          const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30_000 });

          collector.on('collect', async i => {
            if (i.customId.startsWith(`confirm_roleadmin_${interaction.user.id}`)) {
              fs.writeFileSync(rolesConfigPath, JSON.stringify(rolesData, null, 2));
              await i.update({ content: `✅ Saved ${rolesData.length} roles.`, components: [] });
              collector.stop();
            } else {
              await i.update({ content: '❌ Cancelled.', components: [] });
              collector.stop();
            }
          });

          collector.on('end', async collected => {
            if (collected.size === 0) {
              try { await interaction.editReply({ content: '⌛ Interaction expired (no confirmation).', components: [] }); } catch(e){} 
            }
          });
          return;
        }

        if (id.startsWith('rpg_select_')) {
          const ownerId = id.split('_')[2];
          if (interaction.user.id !== ownerId) return interaction.editReply({ content: "❌ You cannot use this menu.", ephemeral:true });
          const choice = interaction.values[0];
          if (choice === 'profile') {
            const u = rpg.getUserData(interaction.user.id);
            return interaction.editReply({ content: `Profile: Level ${u.level} XP ${u.xp} Gold ${u.gold}` });
          }
          if (choice === 'quest') {
            rpg.addXP(interaction.user.id,30);
            rpg.saveUserData(interaction.user.id, rpg.getUserData(interaction.user.id));
            return interaction.editReply({ content: 'Quest completed: +30 XP' });
          }
          if (choice === 'fight') {
            const confirmRow = new ActionRowBuilder().addComponents(
              new ButtonBuilder().setCustomId(`confirm_fight_${interaction.user.id}`).setLabel('Fight').setStyle(ButtonStyle.Danger),
              new ButtonBuilder().setCustomId(`cancel_fight_${interaction.user.id}`).setLabel('Cancel').setStyle(ButtonStyle.Secondary)
            );
            await interaction.editReply({ content: 'Are you sure you want to start a fight? (30s to confirm)', components:[confirmRow] });

            const filter = i => i.user.id === interaction.user.id && (i.customId.startsWith(`confirm_fight_${interaction.user.id}`) || i.customId.startsWith(`cancel_fight_${interaction.user.id}`));
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30_000 });

            collector.on('collect', async i => {
              if (i.customId.startsWith(`confirm_fight_${interaction.user.id}`)) {
                const gain = Math.floor(Math.random()*30)+10;
                const u = rpg.getUserData(i.user.id);
                u.gold += gain;
                rpg.saveUserData(i.user.id, u);
                await i.update({ content: `You fought and gained ${gain} gold.`, components: [] });
                collector.stop();
              } else {
                await i.update({ content: 'Fight cancelled.', components: [] });
                collector.stop();
              }
            });

            collector.on('end', async collected => {
              if (collected.size === 0) {
                try { await interaction.editReply({ content: '⌛ Interaction expired (no confirmation).', components: [] }); } catch(e){} 
              }
            });
            return;
          }
        }

        if (id.startsWith('games_select_')) {
          const ownerId = id.split('_')[2];
          if (interaction.user.id !== ownerId) return interaction.editReply({ content: "❌ You cannot use this menu.", ephemeral:true });
          const choice = interaction.values[0];
          if (choice === 'dado') { const r = Math.floor(Math.random()*6)+1; return interaction.editReply({ content: `🎲 You rolled ${r}` }); }
          if (choice === 'coinflip') { const r = Math.random()<0.5?'Heads':'Tails'; return interaction.editReply({ content: `🪙 ${r}` }); }
          if (choice === 'guess') return interaction.editReply({ content: 'Use `!guess <1-10>`' });
        }

        return interaction.editReply({ content: 'Option received.' });
      }
    } catch(err) {
      console.error('interactionCreate error', err);
      try { if(!interaction.replied) await interaction.reply({ content: 'Error handling interaction', ephemeral:true }); } catch(e) {}
    }
  }
};
