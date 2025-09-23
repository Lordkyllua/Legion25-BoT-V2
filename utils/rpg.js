
const fs = require('fs');
const PATH = './database.json';
function load(){ try { return JSON.parse(fs.readFileSync(PATH,'utf8')); } catch(e){ return {}; } }
function save(db){ fs.writeFileSync(PATH, JSON.stringify(db, null, 2)); }
function ensure(userId){ const db=load(); if(!db[userId]){ db[userId]={gold:100,level:1,xp:0,inventory:[]}; save(db);} return db[userId]; }
module.exports = {
  getUserData(userId){ return ensure(userId); },
  saveUserData(userId,data){ const db=load(); db[userId]=data; save(db); },
  addGold(userId,amt){ const db=load(); const u=ensure(userId); u.gold += amt; save(db); return u; },
  addXP(userId,amt){ const db=load(); const u=ensure(userId); u.xp += amt; while(u.xp >= 100){ u.xp -= 100; u.level += 1; } save(db); return u; },
  addItem(userId,item){ const db=load(); const u=ensure(userId); u.inventory.push(item); save(db); return u; },
  spendGold(userId,amt){ const db=load(); const u=ensure(userId); if(u.gold < amt) return false; u.gold -= amt; save(db); return true; }
};
