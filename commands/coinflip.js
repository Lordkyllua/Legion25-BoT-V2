
module.exports = {
  name: 'coinflip',
  description: 'Flip a coin',
  execute(message) {
    const res = Math.random() < 0.5 ? 'Heads' : 'Tails';
    message.reply(`🪙 ${res}`);
  }
};
