# bindingify [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Transform native bindings to be relative to their file

## Usage
```sh
$ browserify -t bindingify index.js > bundle.js
```

Transforms:
```js
require('bindings')('binding.node')
```
Into:
```js
require('bindings')({bindings: 'binding.node', module_root: __dirname})
```

## Installation
```sh
$ npm install bindingify
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/bindingify.svg?style=flat-square
[3]: https://npmjs.org/package/bindingify
[4]: https://img.shields.io/travis/yoshuawuyts/bindingify/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/bindingify
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/bindingify/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/bindingify
[8]: http://img.shields.io/npm/dm/bindingify.svg?style=flat-square
[9]: https://npmjs.org/package/bindingify
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
