
# Legion25 Bot - Complete

Legion25 Bot (developed by LordK) - complete package with interactive menus.

## Setup
1. `npm install`
2. Set environment variable `DISCORD_TOKEN` to your bot token (recommended) or put it in `config.json` (not recommended).
3. `node index.js`

## Notes
- This bot uses JSON files for persistence (`points.json`, `database.json`, `store.json`). For production use a database like SQLite/Postgres.
- Make sure to give the bot the following intents in the developer portal: Server Members, Message Content.
