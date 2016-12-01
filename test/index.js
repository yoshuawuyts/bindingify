var StringDecoder = require('string_decoder').StringDecoder
var browserify = require('browserify')
var through = require('through2')
var test = require('tape')
var path = require('path')
var fs = require('fs')

var outfile = fs.readFileSync(path.join(__dirname, 'out.js'), 'utf8')

test('should compile bindings', function (t) {
  t.plan(2)

  var b = browserify(path.join(__dirname, 'in.js'))
  var res = ''

  b.ignore('bindings')
  b.transform(path.join(__dirname, '../index'))
  b.transform(function (file) {
    var decoder = new StringDecoder('utf8')
    return through(write, function (cb) {
      decoder.end()
      cb(null, res)
    })

    function write (chunk, _, cb) {
      res += decoder.write(chunk)
      cb()
    }
  })

  b.bundle(function (err) {
    t.ifError(err, 'no compile error')
    t.equal(res, outfile)
  })
})
