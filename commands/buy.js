const points = require('../utils/points');
const store = require('../store.json');
const fs = require('fs');
const DB = './database.json';
module.exports = { name:'buy', description:'Buy item', execute(message,args){
  const item = args[0]; if(!item) return message.channel.send('Usage: !buy <itemId>');
  if(!store[item]) return message.channel.send('Item not found');
  const userId = message.author.id; const cost = store[item].price;
  if (points.getPoints(userId) < cost) return message.channel.send('Not enough coins');
  points.removePoints(userId, cost);
  const db = JSON.parse(fs.readFileSync(DB,'utf8'));
  if(!db.users[userId]) db.users[userId] = { id:userId, level:1, xp:0, hp:100, gold:50, inventory:[] };
  db.users[userId].inventory.push(item);
  fs.writeFileSync(DB, JSON.stringify(db, null, 2));
  message.channel.send(`✅ You bought ${item}`);
} };
