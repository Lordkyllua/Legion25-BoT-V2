
const db = require('../database.json');
module.exports = { name:'warnings', description:'Show warnings', execute(message){ const u=message.mentions.users.first()||message.author; const arr=(db.warnings&&db.warnings[u.id])||[]; if(!arr.length) return message.reply('No warnings'); const lines=arr.map(w=>`- ${w.reason} (by <@${w.by}>)`).join('\n'); message.reply(`Warnings for ${u.tag}:\n${lines}`); } };
