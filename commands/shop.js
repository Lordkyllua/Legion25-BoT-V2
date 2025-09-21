const store = require('../store.json');
module.exports = { name:'shop', description:'Show shop', execute(message){
  let out = '🛒 Shop items:\n';
  for (const k of Object.keys(store)) out += `**${k}** — ${store[k].price} coins — ${store[k].description}\n`;
  message.channel.send(out);
} };
