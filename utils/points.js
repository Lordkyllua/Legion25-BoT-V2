
const fs = require('fs');
const PATH = './points.json';
function load(){ try{ return JSON.parse(fs.readFileSync(PATH,'utf8')); }catch(e){ return {}; } }
function save(db){ fs.writeFileSync(PATH, JSON.stringify(db, null, 2)); }
module.exports = {
  addPoints(userId, amount){ const db=load(); if(!db[userId]) db[userId]={points:0,lastDaily:0}; db[userId].points += amount; save(db); return db[userId].points; },
  removePoints(userId, amount){ const db=load(); if(!db[userId]) db[userId]={points:0,lastDaily:0}; db[userId].points = Math.max(0, db[userId].points-amount); save(db); return db[userId].points; },
  getPoints(userId){ const db=load(); return db[userId]?.points||0; },
  canClaimDaily(userId, cooldownMs=24*60*60*1000){ const db=load(); const now=Date.now(); const last=db[userId]?.lastDaily||0; return (now-last)>=cooldownMs; },
  claimDaily(userId, amount=100){ const db=load(); if(!db[userId]) db[userId]={points:0,lastDaily:0}; db[userId].points += amount; db[userId].lastDaily = Date.now(); save(db); return db[userId]; },
  getRanking(limit=10){ const db=load(); const arr=Object.entries(db).map(([id,v])=>[id,v.points||0]); arr.sort((a,b)=>b[1]-a[1]); return arr.slice(0,limit); }
};
