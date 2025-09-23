
module.exports = { name: 'guess', description: 'Guess number', execute(message,args){ const n=parseInt(args[0]); if(isNaN(n)||n<1||n>10) return message.reply('Usage: !guess <1-10>'); const t=Math.floor(Math.random()*10)+1; if(n===t) message.reply('Correct!'); else message.reply('Wrong. I chose '+t); } };
