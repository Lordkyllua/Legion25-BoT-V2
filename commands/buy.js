
const fs = require('fs');
const points = require('../utils/points');
const store = require('../store.json');
const DB = './database.json';
module.exports = {
  name: 'buy',
  description: 'Buy an item from the shop',
  execute(message, args) {
    const item = args[0];
    if (!item || !store[item]) return message.reply('Usage: !buy <itemId>');
    const cost = store[item].price;
    if (points.getPoints(message.author.id) < cost) return message.reply('Not enough coins');
    points.removePoints(message.author.id, cost);
    const db = JSON.parse(fs.readFileSync(DB,'utf8'));
    if (!db.users[message.author.id]) db.users[message.author.id] = { id:message.author.id, level:1, xp:0, hp:100, gold:50, inventory:[] };
    db.users[message.author.id].inventory.push(item);
    fs.writeFileSync(DB, JSON.stringify(db, null, 2));
    message.reply(`You bought ${item}!`);
  }
};
