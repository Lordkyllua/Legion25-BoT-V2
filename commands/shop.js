
const store = require('../store.json');
module.exports = { name:'shop', description:'Show shop', execute(message){ let out = 'Shop:\n'; for(const [id,it] of Object.entries(store)) out += `**${id}** - ${it.price} - ${it.description}\n`; message.reply(out); } };
