const rpg = require('../utils/rpg');
const clans = require('../utils/clans');

module.exports = {
  name: 'rpg',
  description: 'RPG menu and runner',
  async execute(message,args) {
    if (!args[0]) return message.channel.send('⚔️ RPG commands: profile, quest, fight, createclan, joinclan, leaveclan, claninfo, donate. Use !rpg <sub> [args]');
    const sub = args[0].toLowerCase();
    const id = message.author.id;
    const name = message.author.username;

    if (sub === 'profile') {
      const p = rpg.getProfile(id);
      return message.channel.send(`📜 ${name} — Level ${p.level} — XP ${p.xp} — HP ${p.hp} — Gold ${p.gold}`);
    }
    if (sub === 'quest') {
      rpg.addXP(id, 30);
      rpg.addGold(id, 20);
      return message.channel.send('📝 Quest completed: +30 XP, +20 gold');
    }
    if (sub === 'fight') {
      const enemies = [{name:'Goblin',hp:30,xp:20,gold:10},{name:'Orc',hp:60,xp:40,gold:30},{name:'Dragon',hp:120,xp:100,gold:80}];
      const enemy = enemies[Math.floor(Math.random()*enemies.length)];
      // simple fight
      const playerPower = Math.floor(Math.random()*30)+10;
      const enemyPower = Math.floor(Math.random()*25)+5;
      if (playerPower >= enemyPower) {
        rpg.addXP(id, enemy.xp);
        rpg.addGold(id, enemy.gold);
        return message.channel.send(`⚔️ You defeated **${enemy.name}**! +${enemy.xp} XP, +${enemy.gold} gold`);
      } else {
        rpg.damagePlayer(id, 50);
        return message.channel.send(`💥 You were defeated by **${enemy.name}**... You lost some HP and gold.`);
      }
    }
    if (sub === 'createclan') {
      const cname = args[1];
      if (!cname) return message.channel.send('Usage: !rpg createclan <name>');
      const r = clans.createClan(cname, id);
      if (!r.ok) return message.channel.send('❌ ' + r.msg);
      return message.channel.send(`✅ Clan created: **${r.clan.name}** (id: ${r.clan.id})`);
    }
    if (sub === 'joinclan') {
      const cname = args[1];
      if (!cname) return message.channel.send('Usage: !rpg joinclan <name>');
      const c = clans.getClanByName(cname);
      if (!c) return message.channel.send('Clan not found');
      const r = clans.joinClan(id, c.id);
      if (!r.ok) return message.channel.send('❌ ' + r.msg);
      return message.channel.send(`✅ You joined clan **${c.name}**`);
    }
    if (sub === 'leaveclan') {
      const r = clans.leaveClan(id);
      if (!r.ok) return message.channel.send('❌ ' + r.msg);
      return message.channel.send('✅ You left your clan.');
    }
    if (sub === 'claninfo') {
      const cname = args[1];
      if (!cname) return message.channel.send('Usage: !rpg claninfo <name>');
      const c = clans.getClanByName(cname);
      if (!c) return message.channel.send('Clan not found');
      return message.channel.send(`🏰 Clan ${c.name} — Leader: <@${c.leader}> — Members: ${c.members.length}`);
    }
    if (sub === 'donate') {
      const amount = parseInt(args[1],10);
      if (!amount) return message.channel.send('Usage: !rpg donate <amount>');
      const res = clans.donateToClan(id, amount);
      if (!res.ok) return message.channel.send('❌ ' + res.msg);
      return message.channel.send(`💰 Donated ${amount} coins to your clan.`);
    }
    message.channel.send('Unknown rpg subcommand');
  }
};
