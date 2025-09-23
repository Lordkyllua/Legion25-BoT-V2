
const fs = require('fs');
const PATH = './points.json';
function load(){ try{return JSON.parse(fs.readFileSync(PATH,'utf8'));}catch(e){return{};} }
function save(db){ fs.writeFileSync(PATH, JSON.stringify(db,null,2)); }
module.exports = {
  addPoints(userId,amount){ const db=load(); if(!db[userId]) db[userId]={points:0}; db[userId].points += amount; save(db); return db[userId].points; },
  getPoints(userId){ const db=load(); return db[userId]?.points||0; },
  getRanking(limit=10){ const db=load(); return Object.entries(db).map(([id,v])=>[id,v.points||0]).sort((a,b)=>b[1]-a[1]).slice(0,limit); }
};
