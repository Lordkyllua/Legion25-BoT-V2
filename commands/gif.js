
const fetch = require('node-fetch');
module.exports = { name:'gif', description:'Search gif', async execute(message,args){ const q=args.join(' ')||'funny'; try{ const res=await fetch(`https://g.tenor.com/v1/search?q=${encodeURIComponent(q)}&key=LIVDSRZULELA&limit=10`); const d=await res.json(); if(!d.results||d.results.length===0) return message.reply('No gifs'); const pick=d.results[Math.floor(Math.random()*d.results.length)]; message.reply(pick.url); }catch(e){ message.reply('Error'); } } };
