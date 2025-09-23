
const fs = require('fs');
const PATH = './database.json';
function load(){ try { return JSON.parse(fs.readFileSync(PATH,'utf8')); } catch(e){ return {users:{},clans:{},warnings:{}}; } }
function save(db){ fs.writeFileSync(PATH, JSON.stringify(db, null, 2)); }
function idFromName(name){ return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
module.exports = {
  createClan(name, leaderId){ const db=load(); const id=idFromName(name); if(db.clans[id]) return {ok:false,msg:'Clan already exists'}; db.clans[id]={id,name,leader:leaderId,members:[leaderId],bank:0,invites:[]}; if(!db.users[leaderId]) db.users[leaderId]={id:leaderId,level:1,xp:0,hp:100,gold:50,inventory:[]}; db.users[leaderId].clan = id; save(db); return {ok:true,clan:db.clans[id]}; },
  getClanByName(name){ const id=idFromName(name); const db=load(); return db.clans[id]||null; },
  getClanById(id){ const db=load(); return db.clans[id]||null; },
  inviteToClan(clanId,userId){ const db=load(); const c=db.clans[clanId]; if(!c) return {ok:false}; if(!c.invites) c.invites=[]; if(!c.invites.includes(userId)) c.invites.push(userId); save(db); return {ok:true}; },
  joinClan(userId,clanId){ const db=load(); const c=db.clans[clanId]; if(!c) return {ok:false,msg:'Clan not found'}; if(c.members.includes(userId)) return {ok:false,msg:'Already in clan'}; c.members.push(userId); if(!db.users[userId]) db.users[userId]={id:userId,level:1,xp:0,hp:100,gold:50,inventory:[]}; db.users[userId].clan=clanId; save(db); return {ok:true,clan:c}; },
  leaveClan(userId){ const db=load(); const user=db.users[userId]; if(!user||!user.clan) return {ok:false,msg:'Not in clan'}; const c=db.clans[user.clan]; c.members=c.members.filter(m=>m!==userId); if(c.leader===userId){ if(c.members.length) c.leader=c.members[0]; else delete db.clans[c.id]; } user.clan=null; save(db); return {ok:true}; },
  clanInfo(clanId){ const db=load(); return db.clans[clanId]||null; },
  donateToClan(userId,amount){ const db=load(); const u=db.users[userId]; if(!u||!u.clan) return {ok:false,msg:'Not in clan'}; if(u.gold<amount) return {ok:false,msg:'Not enough gold'}; u.gold-=amount; db.clans[u.clan].bank=(db.clans[u.clan].bank||0)+amount; save(db); return {ok:true}; }
};
