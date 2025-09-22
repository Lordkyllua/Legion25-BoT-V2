const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config.json");

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

// 📂 Cargar comandos
const commandsPath = path.join(__dirname, "commands");
fs.readdirSync(commandsPath).forEach(file => {
    if (file.endsWith(".js")) {
        const command = require(path.join(commandsPath, file));
        client.commands.set(command.name, command);
    }
});

// 📂 Cargar eventos
const eventsPath = path.join(__dirname, "events");
fs.readdirSync(eventsPath).forEach(file => {
    if (file.endsWith(".js")) {
        const event = require(path.join(eventsPath, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
});

// 🟢 Login
client.login(process.env.DISCORD_TOKEN || config.token);
