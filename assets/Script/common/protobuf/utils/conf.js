const Load = require('./loadFile');
const playerData = require('./files/player');
console.log('data', playerData)

const protoMap = new Map()
protoMap.set('player', Load(playerData))

module.exports = protoMap