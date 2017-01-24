require('bindings')({bindings: 'binding.node', module_root: __dirname})
require(require('path').join(__dirname, './build/Release/sodium'))
require(require('path').join(__dirname, '../build/Release/sodium'))
