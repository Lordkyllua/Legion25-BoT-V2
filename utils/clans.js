const fs = require('fs');
const PATH = './database.json';
function load() { try { return JSON.parse(fs.readFileSync(PATH,'utf8')); } catch (e) { return { users: {}, clans: {}, warnings: {} }; } }
function save(db) { fs.writeFileSync(PATH, JSON.stringify(db, null, 2)); }

function makeId(name){ return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

module.exports = {
  createClan(name, leaderId) {
    const db = load();
    const id = makeId(name);
    if (db.clans[id]) return { ok:false, msg:'Clan exists' };
    db.clans[id] = { id, name, leader: leaderId, members: [leaderId], bank:0 };
    if (!db.users[leaderId]) db.users[leaderId] = { id: leaderId, level:1, xp:0, hp:100, gold:50, inventory:[] };
    db.users[leaderId].clan = id;
    save(db);
    return { ok:true, clan: db.clans[id] };
  },
  getClanById(id) { const db = load(); return db.clans[id] || null; },
  getClanByName(name) { const id = makeId(name); return this.getClanById(id); },
  getUserClan(userId) { const db = load(); for (const k in db.clans) if (db.clans[k].members.includes(userId)) return db.clans[k]; return null; },
  inviteToClan(clanId, userId) { const db = load(); const c = db.clans[clanId]; if (!c) return { ok:false }; if (!c.invites) c.invites=[]; if (!c.invites.includes(userId)) c.invites.push(userId); save(db); return { ok:true }; },
  joinClan(userId, clanId) { const db = load(); const c = db.clans[clanId]; if (!c) return { ok:false, msg:'Clan not found' }; if (this.getUserClan(userId)) return { ok:false, msg:'Already in clan' }; if (!c.open && (!c.invites || !c.invites.includes(userId))) return { ok:false, msg:'Not invited' }; c.members.push(userId); c.invites = (c.invites||[]).filter(x=>x!==userId); if (!db.users[userId]) db.users[userId]={ id:userId, level:1, xp:0, hp:100, gold:50, inventory:[] }; db.users[userId].clan = clanId; save(db); return { ok:true, clan:c }; },
  leaveClan(userId) { const db = load(); const c = this.getUserClan(userId); if (!c) return { ok:false, msg:'Not in clan' }; c.members = c.members.filter(m=>m!==userId); if (c.leader===userId) { if (c.members.length) c.leader=c.members[0]; else { delete db.clans[c.id]; save(db); return { ok:true, msg:'Clan disbanded' }; } } db.users[userId].clan = null; save(db); return { ok:true, clan:c }; },
  listClans() { const db = load(); return Object.values(db.clans); },
  donateToClan(userId, amount) { const db = load(); const user = db.users[userId]; if (!user || !user.clan) return { ok:false, msg:'Not in clan' }; const c = db.clans[user.clan]; if (user.gold < amount) return { ok:false, msg:'Not enough gold' }; user.gold -= amount; c.bank = (c.bank||0) + amount; save(db); return { ok:true }; }
};
