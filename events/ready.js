
module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
    const statuses = [
      "Tiny Survivors: Training troops ⚔️",
      "Tiny Survivors: Exploring dungeons 🏰",
      "Tiny Survivors: Building the kingdom 🏗️",
      "Tiny Survivors: Developed by LordK 🤖"
    ];
    let i = 0;
    client.user.setPresence({ activities: [{ name: statuses[0], type: 0 }], status: 'online' });
    setInterval(() => {
      i = (i + 1) % statuses.length;
      client.user.setPresence({ activities: [{ name: statuses[i], type: 0 }], status: 'online' });
    }, 60_000);
  }
};
