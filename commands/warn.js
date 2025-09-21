const fs = require('fs');
const DB = './database.json';
module.exports = { name:'warn', description:'Warn user', execute(message,args){
  if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('No permission');
  const m = message.mentions.users.first(); if(!m) return message.channel.send('Mention user');
  const reason = args.slice(1).join(' ') || 'No reason';
  const db = JSON.parse(fs.readFileSync(DB,'utf8'));
  db.warnings = db.warnings || {};
  if(!db.warnings[m.id]) db.warnings[m.id]=[];
  db.warnings[m.id].push({ by: message.author.id, reason, ts: Date.now() });
  fs.writeFileSync(DB, JSON.stringify(db, null, 2));
  message.channel.send(`⚠️ ${m.tag} warned: ${reason}`);
} };
