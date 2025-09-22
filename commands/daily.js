const points = require('../utils/points');
module.exports = {
  name: 'daily',
  description: 'Claim daily reward',
  execute(message) {
    if (!points.canClaimDaily(message.author.id)) return message.reply('You already claimed today.');
    const user = points.claimDaily(message.author.id, 100);
    message.reply(`You claimed 100 coins! Total: ${user.points}`);
  }
};
