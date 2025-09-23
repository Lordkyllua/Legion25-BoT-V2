
const fetch = require('node-fetch');
module.exports = { name:'quote', description:'Random quote', async execute(message){ try{ const res=await fetch('https://api.quotable.io/random'); const d=await res.json(); message.reply(`"${d.content}" — ${d.author}`); }catch(e){ message.reply('Error'); } } };
