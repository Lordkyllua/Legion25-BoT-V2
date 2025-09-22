const config = require('../config.json');
module.exports = {
  name: 'messageCreate',
  execute(client, message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);
    if (!command) return;
    try {
      command.execute(message, args, client);
    } catch (err) {
      console.error('Command error:', err);
      message.reply('❌ Error executing command.');
    }
  }
};
