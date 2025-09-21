const db = require('../database.json');
module.exports = { name:'warnings', description:'Show warnings for a user', execute(message){
  const m = message.mentions.users.first() || message.author;
  const arr = (db.warnings && db.warnings[m.id]) || [];
  if(!arr.length) return message.channel.send('No warnings');
  message.channel.send(`Warnings for ${m.tag}:\n`+arr.map(w=>`- ${w.reason} by <@${w.by}>`).join('\n'));
} };
