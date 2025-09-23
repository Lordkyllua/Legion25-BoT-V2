
const db = require('../database.json');
module.exports = { name:'inventory', description:'Show inventory', execute(message){ const u=db.users[message.author.id]; if(!u||!u.inventory||u.inventory.length===0) return message.reply('Inventory empty'); message.reply('Inventory: '+u.inventory.join(', ')); } };
