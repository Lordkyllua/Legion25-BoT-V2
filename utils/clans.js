
const fs = require('fs');
const PATH = './database.json';
function load(){ try{return JSON.parse(fs.readFileSync(PATH,'utf8')); }catch(e){return{};} }
function save(db){ fs.writeFileSync(PATH, JSON.stringify(db,null,2)); }
function idFromName(name){ return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
module.exports = {
  createClan(name, leaderId){ const db=load(); if(!db.__clans) db.__clans={}; const id=idFromName(name); if(db.__clans[id]) return {ok:false,msg:'exists'}; db.__clans[id]={id,name,leader:leaderId,members:[leaderId],bank:0}; save(db); return {ok:true,clan:db.__clans[id]}; },
  getClanByName(name){ const db=load(); if(!db.__clans) return null; return db.__clans[idFromName(name)]||null; },
  joinClan(userId,name){ const db=load(); if(!db.__clans) return {ok:false}; const c=db.__clans[idFromName(name)]; if(!c) return {ok:false,msg:'notfound'}; if(!c.members.includes(userId)) c.members.push(userId); save(db); return {ok:true,clan:c}; },
  leaveClan(userId){ const db=load(); if(!db.__clans) return {ok:false,msg:'no clans'}; for(const id in db.__clans){ const c=db.__clans[id]; c.members = c.members.filter(m=>m!==userId); if(c.leader===userId){ if(c.members.length) c.leader=c.members[0]; else delete db.__clans[id]; } } save(db); return {ok:true}; },
  clanInfo(name){ const db=load(); if(!db.__clans) return null; return db.__clans[idFromName(name)]||null; }
};
