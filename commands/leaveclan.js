
const clans = require('../utils/clans');
module.exports = {
  name: 'leaveclan',
  description: 'Leave your clan',
  execute(message) {
    const r = clans.leaveClan(message.author.id);
    if (!r.ok) return message.reply('❌ ' + r.msg);
    message.reply('You left your clan');
  }
};
