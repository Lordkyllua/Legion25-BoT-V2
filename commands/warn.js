
const fs = require('fs');
const { PermissionsBitField } = require('discord.js');
const DB = './database.json';
module.exports = {
  name: 'warn',
  description: 'Warn a user',
  execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('No permission');
    const u = message.mentions.users.first();
    if (!u) return message.reply('Mention a user');
    const reason = args.slice(1).join(' ') || 'No reason';
    const db = JSON.parse(fs.readFileSync(DB,'utf8'));
    db.warnings = db.warnings || {};
    if (!db.warnings[u.id]) db.warnings[u.id] = [];
    db.warnings[u.id].push({ by: message.author.id, reason, ts: Date.now() });
    fs.writeFileSync(DB, JSON.stringify(db, null, 2));
    message.reply(`Warned ${u.tag}`);
  }
};
