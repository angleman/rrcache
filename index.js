// rrcache
// RR Cache with TTL
// Copyright (C) 2014 by angleman,
// All Rights Reserved
// License: MIT

function ramcache(initOptions) {
   var fs      = require('fs')
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
            if (!options.max || keys.length < options.max) { // room in cache
               keys.push(key)
            } else {
               delete cache[key] // cache size exceeded, drop the rest
            }
         }
      }
   }
   function clearTTL(key) {
      if (ttls[key]) {
         clearInterval(ttls[key])
         delete ttls[key]
      }
   }
   function clearTTLs() {
      for(var key in ttls) {
         clearTTL(key)

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
   function set(key, value, ttl) {
      if (typeof key != 'undefined') {
         clearTTL(key)
         if (typeof value == 'undefined') {
            if (cache[key]) { // delete cache existing entry
               delete cache[key]
               var idx = keys.indexOf(key)
               keys.splice(idx, 1)
            }
         } else {
            cache[key] = value
            if (keys.indexOf(key) < 0) {
               cleanCache()
               keys.push(key)
            }
            if (ttl) ttls[key] = setTimeout(expire, ttl, key)
         }
      }
   }
   function loadData(file) {
      file = file || options.file
      if (file) {
         options.file    = file
         if (fs.existsSync(file)) {
            var json     = fs.readFileSync(file, 'utf8')
            options.data = JSON.parse(json)
         }
      }
   }
   function loadFile(file) {
      init()
      loadData(file)
      loadCache(options.data)
      if (options.data) delete options.data // clean up memory
   }
   function saveFile(file) {
      file = file || options.file
      if (file) {
         var json = JSON.stringify(cache)
         fs.writeFileSync(file, json, 'utf8')
      }
   }
   options.max = options.max || 100000
   init()
   loadData(options.file)
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
      set: set,
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
      load:     loadCache,
      loadFile: loadFile,
      saveFile: saveFile
   }

   return publicFunctions
}

module.exports = ramcache
