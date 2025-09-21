const fs = require('fs');
const PATH = './database.json';
function load() { try { return JSON.parse(fs.readFileSync(PATH,'utf8')); } catch (e) { return { users: {}, clans: {}, warnings: {} }; } }
function save(db) { fs.writeFileSync(PATH, JSON.stringify(db, null, 2)); }

module.exports = {
  getProfile(userId) {
    const db = load();
    if (!db.users[userId]) {
      db.users[userId] = { id: userId, level: 1, xp: 0, hp: 100, gold: 50, inventory: [] };
      save(db);
    }
    return db.users[userId];
  },
  addXP(userId, amount) {
    const db = load();
    if (!db.users[userId]) db.users[userId] = { id: userId, level:1, xp:0, hp:100, gold:50, inventory:[] };
    const p = db.users[userId];
    p.xp += amount;
    while (p.xp >= p.level * 100) { p.xp -= p.level * 100; p.level++; p.hp = 100 + p.level*10; }
    save(db);
    return p;
  },
  addGold(userId, amount) {
    const db = load();
    if (!db.users[userId]) db.users[userId] = { id: userId, level:1, xp:0, hp:100, gold:50, inventory:[] };
    db.users[userId].gold += amount;
    save(db);
    return db.users[userId];
  },
  addItem(userId, item) {
    const db = load();
    if (!db.users[userId]) db.users[userId] = { id: userId, level:1, xp:0, hp:100, gold:50, inventory:[] };
    db.users[userId].inventory.push(item);
    save(db);
    return db.users[userId];
  },
  damagePlayer(userId, dmg) {
    const db = load();
    if (!db.users[userId]) return null;
    const p = db.users[userId];
    p.hp -= dmg;
    if (p.hp <= 0) { p.hp = 100 + (p.level-1)*10; p.gold = Math.max(0, p.gold-10); }
    save(db);
    return p;
  }
};
