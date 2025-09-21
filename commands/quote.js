const games = require('./games');
module.exports = { name:'quote', description:'Quote wrapper', execute(message,args){ return games.execute(message,['quote', ...args]); } };
