const games = require('./games');
module.exports = { name:'meme', description:'Meme wrapper', execute(message,args){ return games.execute(message,['meme', ...args]); } };
