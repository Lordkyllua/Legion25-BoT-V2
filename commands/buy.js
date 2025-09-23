
const fs = require('fs');
const points = require('../utils/points');
const store = require('../store.json');
module.exports = { name:'buy', description:'Buy item', execute(message,args){ const item=args[0]; if(!item||!store[item]) return message.reply('Usage: !buy <item>'); const cost=store[item].price; if(points.getPoints(message.author.id)<cost) return message.reply('Not enough coins'); points.removePoints(message.author.id,cost); const db=JSON.parse(fs.readFileSync('./database.json','utf8')); if(!db.users[message.author.id]) db.users[message.author.id]={id:message.author.id,inventory:[]}; db.users[message.author.id].inventory.push(item); fs.writeFileSync('./database.json', JSON.stringify(db,null,2)); message.reply(`You bought ${item}`); } };
