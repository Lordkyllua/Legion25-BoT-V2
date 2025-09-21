const points = require('../utils/points');
module.exports = { name:'daily', description:'Claim daily', execute(message){
  const added = points.addPoints(message.author.id,100);
  message.channel.send(`💰 You claimed daily: +100 coins (total: ${added})`);
} };
