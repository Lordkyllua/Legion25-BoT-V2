const fs = require('fs');
const PATH = './points.json';

function load() {
  try { return JSON.parse(fs.readFileSync(PATH, 'utf8')); } catch (e) { return {}; }
}
function save(db) { fs.writeFileSync(PATH, JSON.stringify(db, null, 2)); }

module.exports = {
  addPoints(userId, amount) {
    const db = load();
    db[userId] = (db[userId] || 0) + amount;
    save(db);
    return db[userId];
  },
  removePoints(userId, amount) {
    const db = load();
    db[userId] = (db[userId] || 0) - amount;
    if (db[userId] < 0) db[userId] = 0;
    save(db);
    return db[userId];
  },
  getPoints(userId) {
    const db = load();
    return db[userId] || 0;
  },
  getRanking(limit = 10) {
    const db = load();
    return Object.entries(db).sort((a,b)=>b[1]-a[1]).slice(0,limit);
  }
};
