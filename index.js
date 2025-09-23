
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))) {
  const cmd = require(path.join(commandsPath, file));
  if (cmd && cmd.name) client.commands.set(cmd.name, cmd);
}

// Load events
const eventsPath = path.join(__dirname, 'events');
for (const file of fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'))) {
  const ev = require(path.join(eventsPath, file));
  if (ev.once) client.once(ev.name, (...args) => ev.execute(...args, client));
  else client.on(ev.name, (...args) => ev.execute(...args, client));
}

// graceful shutdown
process.on('SIGINT', async () => { console.log('SIGINT - shutting down'); try{ await client.destroy(); }catch(e){} process.exit(0); });
process.on('SIGTERM', async () => { console.log('SIGTERM - shutting down'); try{ await client.destroy(); }catch(e){} process.exit(0); });

const token = process.env.DISCORD_TOKEN || config.token;
if (!token || token.includes('PUT_TOKEN')) {
  console.error('DISCORD_TOKEN not found. Set env DISCORD_TOKEN or update config.json');
  process.exit(1);
}
client.login(token);
