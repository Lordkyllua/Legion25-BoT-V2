const games = require('./games');
module.exports = {
  name: 'dado',
  description: 'Roll dice (wrapper)',
  execute(message,args){ return games.execute(message,['dice', ...args]); }
};
