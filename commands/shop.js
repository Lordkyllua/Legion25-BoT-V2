const store = require('../store.json');
module.exports = {
  name: 'shop',
  description: 'Show shop items',
  execute(message) {
    let out = '🛒 Shop items:\n';
    for (const [id,item] of Object.entries(store)) out += `**${id}** — ${item.price} coins — ${item.description}\n`;
    message.channel.send(out);
  }
};
