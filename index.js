const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
  const cmd = require(path.join(commandsPath, file));
  client.commands.set(cmd.name, cmd);
}

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));
for (const file of eventFiles) {
  const ev = require(path.join(eventsPath, file));
  if (ev.once) client.once(ev.name, (...args) => ev.execute(client, ...args));
  else client.on(ev.name, (...args) => ev.execute(client, ...args));
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('⚠️ SIGINT received — shutting down gracefully');
  try { await client.destroy(); } catch(e) {}
  process.exit(0);
});
process.on('SIGTERM', async () => {
  console.log('⚠️ SIGTERM received — shutting down gracefully');
  try { await client.destroy(); } catch(e) {}
  process.exit(0);
});

// Login
if (!process.env.DISCORD_TOKEN) {
  console.error('❌ DISCORD_TOKEN not set. In Railway set the environment variable DISCORD_TOKEN');
  process.exit(1);
}
client.login(process.env.DISCORD_TOKEN);
