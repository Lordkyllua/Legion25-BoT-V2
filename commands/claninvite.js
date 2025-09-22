const clans = require('../utils/clans');
module.exports = { name:'claninvite', description:'Invite user to clan', execute(message,args){ const m = message.mentions.members.first(); if(!m) return message.reply('Mention a member'); const c = clans.getClanById(message.mentions.users.first()?.id) || clans.getUserClan ? null : null; // placeholder; use !createclan/!joinclan flows
  message.reply('Use !createclan and invite via clan system.'); } };
