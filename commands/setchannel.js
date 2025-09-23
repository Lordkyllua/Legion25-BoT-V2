
const fs = require('fs');
const path = require('path');
const cfgPath = path.join(__dirname, '../config.json');
module.exports = { name:'setchannel', description:'Set channel', execute(message,args){ if(!message.member.permissions.has('ManageGuild')) return message.reply('No permission'); const type=args[0]; if(!['welcome','roles','games'].includes(type)) return message.reply('Usage: !setchannel <welcome|roles|games>'); const cfg=JSON.parse(fs.readFileSync(cfgPath,'utf8')); cfg[type+'Channel']=message.channel.id; fs.writeFileSync(cfgPath, JSON.stringify(cfg,null,2)); message.reply(`Set ${type} channel to <#${message.channel.id}>`); } };
