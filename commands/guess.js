
module.exports = {
  name: 'guess',
  description: 'Guess a number 1-10',
  execute(message, args) {
    const num = parseInt(args[0]);
    if (isNaN(num) || num < 1 || num > 10) return message.reply('Usage: !guess <1-10>');
    const target = Math.floor(Math.random()*10)+1;
    if (num === target) return message.reply('🎉 Correct!');
    return message.reply(`❌ Wrong. I chose ${target}.`);
  }
};
