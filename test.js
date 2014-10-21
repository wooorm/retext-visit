'use strict';

var visit,
    inspect,
    Retext,
    assert,
    retext,
    TextOM,
    sentence;

/**
 * Dependencies.
 */

visit = require('./');
inspect = require('retext-inspect');
Retext = require('retext');
assert = require('assert');

/**
 * Constants.
 */

sentence = 'A simple english sentence.';

retext = new Retext().use(visit).use(inspect);
TextOM = retext.TextOM;

/**
 * Tests.
 */

describe('visit', function () {
    it('should be of type `function`', function () {
        assert(typeof visit === 'function');
    });

    it('should attach a `visit` method to `Parent#`', function () {
        assert(typeof (new TextOM.Parent()).visit === 'function');
        assert(typeof (new TextOM.Element()).visit === 'function');
        assert(typeof (new TextOM.RootNode()).visit === 'function');
        assert(typeof (new TextOM.ParagraphNode()).visit === 'function');
        assert(typeof (new TextOM.SentenceNode()).visit === 'function');
        assert(typeof (new TextOM.WordNode()).visit === 'function');
        assert(typeof (new TextOM.PunctuationNode()).visit === 'function');
        assert(typeof (new TextOM.WhiteSpaceNode()).visit === 'function');
    });

    it('should attach a `visitType` method to `Parent#`', function () {
        assert(typeof (new TextOM.Parent()).visitType === 'function');
        assert(typeof (new TextOM.Element()).visitType === 'function');
        assert(typeof (new TextOM.RootNode()).visitType === 'function');
        assert(typeof (new TextOM.ParagraphNode()).visitType === 'function');
        assert(typeof (new TextOM.SentenceNode()).visitType === 'function');
        assert(typeof (new TextOM.WordNode()).visitType === 'function');
        assert(
            typeof (new TextOM.PunctuationNode()).visitType === 'function'
        );
        assert(typeof (new TextOM.WhiteSpaceNode()).visitType === 'function');
    });
});

describe('visit(callback)', function () {
    it('should invoke `callback` for every descendant of context',
        function (done) {
            retext.parse(sentence, function (err, tree) {
                var count;

                count = 0;

                tree.visit(function () {
                    count++;
                });

                assert(count === 18);

                done(err);
            });
        }
    );

    it('should stop when `callback` returns `false`', function (done) {
        retext.parse(sentence, function (err, tree) {
            var count,
                breakingNode;

            count = 0;
            breakingNode = tree.head.head.head.next.next;

            tree.visit(function (node) {
                count++;

                if (node === breakingNode) {
                    return false;
                }
            });

            assert(count === 7);

            done(err);
        });
    });
});

describe('visit(type, callback)', function () {
    it('should invoke `callback` for every descendant of context of `type`',
        function (done) {
            retext.parse(sentence, function (err, tree) {
                var count;

                count = 0;

                tree.visit(tree.WORD_NODE, function () {
                    count++;
                });

                assert(count === 4);

                done(err);
            });
        }
    );

    it('should stop when `callback` returns `false`', function (done) {
        retext.parse(sentence, function (err, tree) {
            var count,
                breakingNode;

            count = 0;
            breakingNode = tree.head.head.head.next.next;

            tree.visit(tree.WORD_NODE, function (node) {
                count++;

                if (node === breakingNode) {
                    return false;
                }
            });

            assert(count === 2);

            done(err);
        });
    });
});

describe('visitType()', function () {
    it('should throw when invoked', function (done) {
        retext.parse(sentence, function (err, tree) {
            assert.throws(tree.visitType);

            done(err);
        });
    });
});
