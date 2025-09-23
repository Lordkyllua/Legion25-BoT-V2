
const points = require('../utils/points');
module.exports = { name:'daily', description:'Claim daily', execute(message){ if(!points.canClaimDaily(message.author.id)) return message.reply('You already claimed today'); const u=points.claimDaily(message.author.id,100); message.reply('Claimed 100 coins. Total: '+u.points); } };
