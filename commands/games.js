const fetch = require('node-fetch');
module.exports = {
  name: 'games',
  description: 'Games menu and runner',
  execute(message, args) {
    if (!args[0]) {
      return message.channel.send('🎮 Games: dice, rps, coinflip, guess, meme, quote, gif. Use !games <game> [args]');
    }
    const game = args[0].toLowerCase();
    if (game === 'dice' || game === 'dado') {
      const r = Math.floor(Math.random()*6)+1;
      return message.channel.send(`🎲 You rolled: **${r}**`);
    }
    if (game === 'rps' || game === 'ppt') {
      const choice = args[1]?.toLowerCase();
      const opts = ['rock','paper','scissors'];
      if (!choice || !opts.includes(choice)) return message.channel.send('Usage: !games rps <rock|paper|scissors>');
      const bot = opts[Math.floor(Math.random()*3)];
      let res = 'It\'s a tie!';
      if ((choice==='rock'&&bot==='scissors')||(choice==='paper'&&bot==='rock')||(choice==='scissors'&&bot==='paper')) res='You win! 🎉';
      else if (choice!==bot) res='You lose! 💀';
      return message.channel.send(`You: **${choice}** • Bot: **${bot}** — ${res}`);
    }
    if (game === 'coinflip') {
      const r = Math.random()<0.5?'Heads 🪙':'Tails 🪙';
      return message.channel.send(`Result: **${r}**`);
    }
    if (game === 'guess') {
      const n = Math.floor(Math.random()*10)+1;
      const g = parseInt(args[1],10);
      if (!g) return message.channel.send('Usage: !games guess <1-10>');
      if (g===n) return message.channel.send(`🎉 Correct! It was ${n}`);
      return message.channel.send(`❌ Wrong — it was ${n}`);
    }
    if (game === 'meme') {
      return fetch('https://meme-api.com/gimme').then(r=>r.json()).then(d=>message.channel.send({content:d.title, files:[d.url]})).catch(()=>message.channel.send('Error fetching meme'));
    }
    if (game === 'quote') {
      return fetch('https://api.quotable.io/random').then(r=>r.json()).then(d=>message.channel.send(`“${d.content}” — ${d.author}`)).catch(()=>message.channel.send('Error fetching quote'));
    }
    if (game === 'gif') {
      const q = args.slice(1).join(' ') || 'funny';
      return fetch(`https://g.tenor.com/v1/search?q=${encodeURIComponent(q)}&key=LIVDSRZULELA&limit=10`).then(r=>r.json()).then(d=>{
        if(!d.results||!d.results.length) return message.channel.send('No gifs found');
        const pick = d.results[Math.floor(Math.random()*d.results.length)];
        message.channel.send(pick.url);
      }).catch(()=>message.channel.send('Error fetching gif'));
    }
    message.channel.send('Unknown game. Use !games for list.');
  }
};
