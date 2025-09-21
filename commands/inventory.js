const db = require('../database.json');
module.exports = { name:'inventory', description:'Show inventory', execute(message){
  const u = db.users[message.author.id]; if(!u || !u.inventory || !u.inventory.length) return message.channel.send('Your inventory is empty');
  message.channel.send(`🎒 Inventory: ${u.inventory.join(', ')}`);
} };
