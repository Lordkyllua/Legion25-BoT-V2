const db = require('../database.json');
module.exports = {
  name: 'warnings',
  description: 'Show warnings for a user',
  execute(message) {
    const user = message.mentions.users.first() || message.author;
    const arr = (db.warnings && db.warnings[user.id]) || [];
    if (!arr.length) return message.reply('No warnings');
    const lines = arr.map(w=>`- ${w.reason} (by <@${w.by}>)`).join('\n');
    message.reply(`Warnings for ${user.tag}:\n${lines}`);
  }
};
