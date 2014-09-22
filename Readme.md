# retext-visit [![Build Status](https://travis-ci.org/wooorm/retext-visit.svg?branch=master)](https://travis-ci.org/wooorm/retext-visit) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-visit.svg)](https://coveralls.io/r/wooorm/retext-visit?branch=master)

**[retext](https://github.com/wooorm/retext "Retext")** node visitor.

## Installation

npm:
```sh
$ npm install retext-visit
```

Component:
```sh
$ component install wooorm/retext-visit
```

Bower:
```sh
$ bower install retext-visit
```

## Usage

```js
var Retext,
    retext,
    visit;

Retext = require('retext');
visit = require('retext-visit');

retext = new Retext().use(visit);
```

## API

The below examples uses retext 0.2.0, which is currently in beta. For an example with the stable retext, see [retext-visit@0.1.0](https://github.com/wooorm/retext-visit/tree/0.1.0).

### Node#visit(function(Node): boolean?)

```js
retext.parse('A simple English sentence.', function (err, tree) {
    if (err) throw err;

    /**
     * Visit every node in the first sentence.
     */

    tree.head.head.visit(function (node) {
        console.log(node.toString(), node.type);
    });
    /**
     * 'A', 'WordNode'
     * 'A', 'TextNode'
     * ' ', 'WhiteSpaceNode'
     * ' ', 'TextNode'
     * 'simple', 'WordNode'
     * 'simple', 'TextNode'
     * ' ', 'WhiteSpaceNode'
     * ' ', 'TextNode'
     * 'English', 'WordNode'
     * 'English', 'TextNode'
     * ' ', 'WhiteSpaceNode'
     * ' ', 'TextNode'
     * 'sentence', 'WordNode'
     * 'sentence', 'TextNode'
     * '.', 'PunctuationNode'
     * '.', 'TextNode'
     */
});
```

Invoke `callback` for every descendant of the operated on context.

- `callback` (`function(Node): boolean?`): Visitor. Stops visiting when the return value is `false`.

### Node#visitType(type, callback)

```js
retext.parse('A simple English sentence.', function (err, tree) {
    if (err) throw err;

    /**
     * Visit every word node.
     */

    tree.visitType(tree.WORD_NODE, function (node) {
        console.log(node.toString(), node.type);
    });
    /**
     * 'A', 'WordNode'
     * 'simple', 'WordNode'
     * 'English', 'WordNode'
     * 'sentence', 'WordNode'
     */
});
```

Invoke `callback` for every descendant with a given `type` in the operated on context.

- `type` (`string`): Type of the nodes to visit.
- `callback` (`function(Node): boolean?`): Visitor. Stops visiting when the return value is `false`.

## License

MIT © Titus Wormer
