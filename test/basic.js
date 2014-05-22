// mocha doc: http://visionmedia.github.io/mocha/

assert = require('assert')

describe('basic', function() {
    it('module loads', function() {
		var test = require('../index.js')
		assert(test !== undefined)
    })
})
