
const points = require('../utils/points');
module.exports = { name:'ranking', description:'Show top points', execute(message){ const top=points.getRanking(10); if(!top.length) return message.reply('No points'); const out=top.map((t,i)=>`${i+1}. <@${t[0]}> — ${t[1]} pts`).join('\n'); message.reply('🏆 Top players:\n'+out); } };
