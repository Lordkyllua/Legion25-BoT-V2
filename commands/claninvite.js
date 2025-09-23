
const clans = require('../utils/clans');
module.exports = { name:'claninvite', description:'Invite to clan', execute(message,args){ const m=message.mentions.members.first(); if(!m) return message.reply('Mention a member'); message.reply(`Invite sent to ${m.user.tag}`); } };
