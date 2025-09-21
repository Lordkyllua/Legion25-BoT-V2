const games = require('./games');
module.exports = {
  name: 'ppt',
  description: 'Rock Paper Scissors wrapper',
  execute(message,args){ return games.execute(message,['rps', ...args]); }
};
