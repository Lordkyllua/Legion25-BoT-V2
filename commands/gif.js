const fetch = require('node-fetch');
module.exports = {
  name: 'gif',
  description: 'Get a gif by keyword',
  async execute(message, args) {
    const q = args.join(' ') || 'funny';
    try {
      const res = await fetch(`https://g.tenor.com/v1/search?q=${encodeURIComponent(q)}&key=LIVDSRZULELA&limit=10`);
      const d = await res.json();
      if (!d.results || d.results.length===0) return message.reply('No gifs found');
      const pick = d.results[Math.floor(Math.random()*d.results.length)];
      message.channel.send(pick.url);
    } catch(e){ message.channel.send('Error fetching gif'); }
  }
};
