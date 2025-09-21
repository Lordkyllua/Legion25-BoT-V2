const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Show command list',
  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle('📜 Command List')
      .setColor('Aqua')
      .setDescription('Commands grouped by category')
      .addFields(
        { name: '🎮 Games', value: '`!games` - Game menu (dice, rps, coinflip, guess, meme, gif, quote)' },
        { name: '⚔️ RPG', value: '`!rpg` - RPG menu (profile, quest, fight, clans)' },
        { name: '🏰 Clans', value: '`!clan` - Clan menu (create, join, leave, info, invite)' },
        { name: '💰 Economy', value: '`!daily`, `!shop`, `!buy`, `!inventory`, `!ranking`' },
        { name: '👮 Moderation', value: '`!warn`, `!warnings`, `!mute`, `!roles`, `!roleadmin`, `!setchannel`' }
      )
      .setFooter({ text: '🤖 Developed by LordK | Inspired by Tiny Survivors' });
    message.channel.send({ embeds: [embed] });
  }
};
