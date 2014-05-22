var Cache = require('./index.js')
var cache = new Cache({max: 7})

for (var i=0; i<30; i++) {
   var random = Math.floor(Math.random() * 10)
   var key = 'k' + random
   var val = 'value' + (random + Math.floor(Math.random() * 10) / 10)
   if (Math.random() < 0.1) {
      cache.set(key)
      console.log('CLR', key, JSON.stringify(cache.values()), cache.length())
   } else {
      cache.set(key, val)
      console.log('SET', key, val, JSON.stringify(cache.values()), cache.length())
   }
}
