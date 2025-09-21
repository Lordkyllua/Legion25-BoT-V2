module.exports = { name:'roleadmin', description:'Create role (admin)', async execute(message,args){
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('No permission');
  const name = args.join(' '); if(!name) return message.channel.send('Usage: !roleadmin <name>');
  await message.guild.roles.create({ name, reason: 'Created by bot' });
  message.channel.send(`Role ${name} created`);
} };
