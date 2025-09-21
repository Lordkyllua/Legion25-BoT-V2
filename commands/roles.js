module.exports = { name:'roles', description:'Assign yourself a role', execute(message,args){
  const roleName = args.join(' '); if(!roleName) return message.channel.send('Usage: !roles <role name>');
  const r = message.guild.roles.cache.find(x=>x.name.toLowerCase()===roleName.toLowerCase());
  if(!r) return message.channel.send('Role not found');
  message.member.roles.add(r).then(()=>message.channel.send(`Assigned role ${r.name}`)).catch(()=>message.channel.send('Failed to assign role'));
} };
