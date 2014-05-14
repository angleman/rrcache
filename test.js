var Cache = require('./index.js')
var cache = new Cache({max: 10})

for (var i=0; i<20; i++) {
   var key = 'k' + i
   var val = 'value' + i
   cache.set(key, val)
   console.log(i, cache.length(), JSON.stringify(cache.values()))
}

var cache2 = new Cache({max: 10})
for (var i=0; i<20; i++) {
   var key = 'k' + i
   var val = 'value' + i
   cache2.set(key, val)
   console.log(i, cache2.length(), JSON.stringify(cache2.values()))
}

console.log(' ')
console.log(JSON.stringify(cache.values()))
