
const fetch = require('node-fetch');
module.exports = { name:'meme', description:'Fetch meme', async execute(message){ try{ const res=await fetch('https://meme-api.com/gimme'); const d=await res.json(); message.channel.send({ content:d.title, files:[d.url] }); }catch(e){ message.reply('Error'); } } };
