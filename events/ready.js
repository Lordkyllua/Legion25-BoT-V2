
module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
    const statuses = [
      "Playing Tiny Survivors",
      "Developed by LordK",
      "Conquering lands",
      "Training troops"
    ];
    let i=0;
    client.user.setPresence({ activities:[{ name: statuses[0], type: 0 }], status: 'online' });
    setInterval(()=>{ client.user.setPresence({ activities:[{ name: statuses[i], type: 0 }] }); i=(i+1)%statuses.length; }, 60_000);
  }
};
