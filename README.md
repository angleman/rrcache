# rrcache

Random Replacement Cache with TTL and preload option. A simple and clean RR cache that just works.

See [Cache Types](https://en.wikipedia.org/wiki/Cache_algorithms) for a comparison of different cache algorithms

## install

```sh
npm i rrcache
```

## usage

```js
var defaultOptions = { max: 100000 } // max entries
var rrcache = require('rrcache')(defaultOptions)
```

### get(key) => value

```js
value = rrcache.get('keyvalue')
```

### set(key, value[, ttl])

optional ttl (time to live)

setting a key without a ttl will clear any current timeout

```js
rrcache.set('project', 'rrcache') // will automatically make room

or

rrcache.set('mykey', 'myvalue', 60000) // expire key in 60 seconds
```

### clear()

clear the cache

```js
rrcache.clear()
```

### options(newOptions)

change the cache options, currently only can change the max threshold. If the ```max``` cache size is decreased, the cache will automatically clean the cache to the new size. ```max = 0``` disables the RR cleaning of the cache.

```js
rrcache.options({max: 0}) // disable cache
```

### length()

return the number of entries in the cache

```js
var currentEntries = rrcache.length()
```

### values()

return the current key/values of the cache

```js
rrcache.set('firstbase', 'jon')
rrcache.set('secondbase', 'joe')

var values = rrcache.values()
console.log(values)
{
   "firstbase": "jon",
   "secondbase": "joe"
}
```

or persist the cache values for later

```js
fs = require('fs')
fs.writeFileSync('mycache.json', JSON.stringify(rrcache.values()))
```

### load(values)

manually load the cache with a set of values

```js
fs = require('fs')
rrcache.load(JSON.parse(fs.readFileSync('mycache.json')))
```

loadFile()

```js
rrcache.loadFile('mycache.json')
```

saveFile()

```js
rrcache.saveFile('mycache.json')
// or if previous loadFile
rrcache.saveFile()
```


preload the cache with a set of values

```js
fs              = require('fs')
var initialData = JSON.parse(fs.readFileSync('mycache.json'))
var rrcache     = require('rrcache')({ data: initialData }) // preload cache
```

reload the cache during init

```js
var rrcache = require('rrcache')({ file: 'mycache.json', max: 1000000})
```

### multiple cache instances

```js
var RRCache = require('rrcache')
var cache1  = new RRCache()
var cache2  = new RRCache()
```

## License: MIT
