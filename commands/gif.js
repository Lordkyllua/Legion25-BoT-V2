const games = require('./games');
module.exports = { name:'gif', description:'Gif wrapper', execute(message,args){ return games.execute(message,['gif', ...args]); } };
