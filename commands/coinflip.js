
module.exports = { name:'coinflip', description:'Flip a coin', execute(message){ const r=Math.random()<0.5?'Heads':'Tails'; message.reply('🪙 '+r); } };
