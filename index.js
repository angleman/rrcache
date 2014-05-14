// rrcache
// RR Cache with TTL
// Copyright (C) 2014 by angleman,
// All Rights Reserved
// License: MIT

function ramcache(initOptions) {
   var cache, keys, ttls
   var options = initOptions || {}
   function init() {
      cache = {}
      keys  = []
      ttls  = {}
   }
   function loadCache(values) {
      if (values) {
         cache = values
         keys  = []
         for (var key in cache) {
            keys.push(key)
         }
      }
   }
   function clearTTL(key) {
      if (ttls[key]) {
         clearInterval(ttls[key])
         delete ttls[key]
      }
   }
   function cleanCache() {
      while (options.max && keys.length >= options.max) {
         var random = Math.round(Math.random() * keys.length)
         var key    = keys[random]
         keys.splice(random, 1)
         delete cache[key]
         clearTTL(key)
      }
   }
   options.max = options.max || 100000
   init()
   loadCache(options.data)
   function expire(key) {
      if (ttls[key])  delete ttls[key]
      if (cache[key]) delete cache[key]
      var i = keys.indexOf(key)
      if (i > 0) keys.splice(i, 1)
   }

   var publicFunctions = {
      get: function(key) {
         return cache[key]
      },
      set: function(key, value, ttl) {
         if (typeof key != 'undefined') {
            cleanCache()
            cache[key] = value
            keys.push(key)
            clearTTL(key)
            if (ttl) ttls[key] = setTimeout(expire, ttl, key)
         }
      },
      options: function(newOptions) {
         options = newOptions || options
         cleanCache()
      },
      clear:  init,
      length: function() {
         return keys.length
      },
      values: function() {
         return cache
      },
      load: loadCache
   }

   return publicFunctions
}

module.exports = ramcache
