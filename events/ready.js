module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log('🤖 Developed by LordK');
    const statuses = [
      "Tiny Survivors: Training troops ⚔️",
      "Tiny Survivors: Exploring dungeons 🏰",
      "Tiny Survivors: Building the kingdom 🏗️",
      "Tiny Survivors: Conquering lands 🌍"
    ];
    let i = 0;
    client.user.setPresence({ activities:[{ name: statuses[0], type: 0 }], status: 'online' });
    setInterval(()=>{
      client.user.setPresence({ activities:[{ name: statuses[i], type: 0 }], status: 'online' });
      i = (i+1) % statuses.length;
    }, 60000);
  }
};
