# retext-visit [![Build Status](https://travis-ci.org/wooorm/retext-visit.png)](https://travis-ci.org/wooorm/retext-visit)

**[retext](https://github.com/wooorm/retext "Retext")** node visitor.

## Installation

### With NPM

```sh
$ npm install retext-visit
```

### Git

```sh
git clone https://github.com/wooorm/retext-visit.git
cd retext-visit
npm install
```

## Usage

```js
var Retext = require('retext'),
    visit = require('retext-visit');

var root = new Retext()
    .use(visit)
    .parse('A simple english sentence.');
```

## API

### Node#visit(callback)

```js
root.head.head.visit(function (node) {
    console.log(node.toString());
});
// 'A'
// ' '
// 'simple'
// ' '
// 'english'
// ' '
// 'sentence'
// '.'
```

Visit every node inside the operated on node.

- `callback` (`function`): The function to call with each node.

When callback return false, stops iterating.

### Node#visitType(type, callback)

```js
root.visitType(root.WORD_NODE, function (wordNode) {
    console.log(wordNode.toString());
});
// 'A'
// 'simple'
// 'english'
// 'sentence'
```

Visit every node of type `type` inside the operated on node.

- `type`: A type of a node (e.g., PARAGRAPH_NODE, WORD_NODE, or WHITE_SPACE_NODE);
- `callback` (`function`): The function to call with each node.

When callback return false, stops iterating.

## License

  MIT
