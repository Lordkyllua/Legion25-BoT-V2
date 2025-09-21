const fs = require('fs');
const cfgPath = './config.json';
module.exports = { name:'setchannel', description:'Set special channel', execute(message,args){
  if(!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('No permission');
  const type = args[0]; if(!['welcome','roles','games'].includes(type)) return message.channel.send('Usage: !setchannel <welcome|roles|games>');
  const cfg = JSON.parse(fs.readFileSync(cfgPath,'utf8'));
  cfg[type+'Channel'] = message.channel.id;
  fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
  message.channel.send(`Set ${type} channel to <#${message.channel.id}>`);
} };
