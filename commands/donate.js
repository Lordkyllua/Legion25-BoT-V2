const clans = require('../utils/clans');
module.exports = { name:'donate', description:'Donate to clan', execute(message,args){
  const amount = parseInt(args[0],10); if(!amount) return message.channel.send('Usage: !donate <amount>');
  const r = clans.donateToClan(message.author.id, amount); if(!r.ok) return message.channel.send('❌ '+r.msg);
  message.channel.send('✅ Donation successful');
} };
