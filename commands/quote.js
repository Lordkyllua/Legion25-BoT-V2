
const fetch = require('node-fetch');
module.exports = {
  name: 'quote',
  description: 'Get an inspirational quote',
  async execute(message) {
    try {
      const res = await fetch('https://api.quotable.io/random');
      const d = await res.json();
      message.channel.send(`📜 "${d.content}" — ${d.author}`);
    } catch(e){ message.channel.send('Error fetching quote'); }
  }
};
