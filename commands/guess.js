const games = require('./games');
module.exports = { name:'guess', description:'Guess number wrapper', execute(message,args){ return games.execute(message,['guess', ...args]); } };
