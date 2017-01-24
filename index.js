var StringDecoder = require('string_decoder').StringDecoder
var through = require('through2')
var falafel = require('falafel')

module.exports = bindingify

function bindingify (file) {
  if (!/\.js$/.test(file)) return through()

  var decoder = new StringDecoder('utf8')
  var src = ''

  return through(write, flush)

  function write (chunk, _, cb) {
    src += decoder.write(chunk)
    cb()
  }

  function flush (cb) {
    src += decoder.end()

    var output = falafel(src, function (node) {
      var val, str

      if (
        node.type === 'Literal' &&
        /build\/Release/.test(node.value) &&
        node.parent &&
        node.parent.callee &&
        node.parent.callee.type === 'Identifier' &&
        node.parent.callee.name === 'require'
      ) {
        val = node.value
        str = "require('path').join(__dirname, '" + val + "')"
        node.update(str)
      } else if (
        node.type === 'CallExpression' &&
        node.arguments.length &&
        node.callee &&
        node.callee.arguments &&
        node.callee.arguments.length &&
        node.callee.arguments[0].value === 'bindings'
      ) {
        val = node.arguments[0].value
        str = "{bindings: '" + val + "', module_root: __dirname}"
        node.arguments[0].update(str)
      }
    })

    this.push(output.toString())
    cb()
  }
}
