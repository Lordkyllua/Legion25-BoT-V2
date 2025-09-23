
const clans = require('../utils/clans');
module.exports = { name:'leaveclan', description:'Leave clan', execute(message){ const r=clans.leaveClan(message.author.id); if(!r.ok) return message.reply('Error: '+r.msg); message.reply('You left clan'); } };
