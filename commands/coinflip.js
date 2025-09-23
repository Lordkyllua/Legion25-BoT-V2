
module.exports = { name:'coinflip', description:'Flip coin', execute(message){ const r=Math.random()<0.5?'Heads':'Tails'; message.reply('🪙 '+r); } };
