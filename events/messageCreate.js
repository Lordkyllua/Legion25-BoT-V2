
const cfg = require('../config.json');
const prefix = cfg.prefix || '!';
module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    try {
      if(!message || !message.author) return;
      if(message.author.bot) return;
      if(!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const cmdName = args.shift().toLowerCase();
      const command = client.commands.get(cmdName);
      if(!command) return;
      await command.execute(message, args, client);
    } catch(err) {
      console.error('messageCreate error', err);
    }
  }
};
