const games = require('./games');
module.exports = {
  name: 'coinflip',
  description: 'Coin flip wrapper',
  execute(message,args){ return games.execute(message,['coinflip', ...args]); }
};
