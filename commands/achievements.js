
const fs = require('fs');
const DB = './database.json';
module.exports = { name:'achievements', description:'Show achievements', execute(message){ const db = JSON.parse(fs.readFileSync(DB,'utf8')); const u = db.users[message.author.id]; const list = u && u.achievements ? u.achievements : []; if(!list.length) return message.reply('No achievements yet'); message.reply('Achievements: ' + list.join(', ')); } };
