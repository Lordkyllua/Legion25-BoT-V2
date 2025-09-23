
const fetch = require('node-fetch');
module.exports = {
  name: 'meme',
  description: 'Fetch a meme',
  async execute(message) {
    try {
      const res = await fetch('https://meme-api.com/gimme');
      const data = await res.json();
      message.channel.send({ content: data.title, files: [data.url] });
    } catch(e) { message.channel.send('Error fetching meme'); }
  }
};
