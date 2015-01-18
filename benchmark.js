'use strict';

var Retext,
    visit;

/*
 * Dependencies.
 */

Retext = require('retext');
visit = require('./');

/*
 * Dependencies.
 */

var retext;

retext = new Retext().use(visit);

/*
 * Test data: A (big?) article (w/ 100 paragraphs, 500
 * sentences, 10,000 words);
 *
 * Source:
 *   http://www.gutenberg.org/files/10745/10745-h/10745-h.htm
 */

var sentence,
    paragraph,
    section,
    article;

sentence = 'Where she had stood was clear, and she was gone since Sir ' +
    'Kay does not choose to assume my quarrel.';

paragraph = 'Thou art a churlish knight to so affront a lady ' +
    'he could not sit upon his horse any longer. ' +
    'For methinks something hath befallen my lord and that he ' +
    'then, after a while, he cried out in great voice. ' +
    'For that light in the sky lieth in the south ' +
    'then Queen Helen fell down in a swoon, and lay. ' +
    'Touch me not, for I am not mortal, but Fay ' +
    'so the Lady of the Lake vanished away, everything behind. ' +
    sentence;

section = paragraph + Array(10).join('\n\n' + paragraph);

article = section + Array(10).join('\n\n' + section);

/*
 * Setup.
 */

before(function (done) {
    retext.parse(section, function (err, tree) {
        section = tree;

        done(err);
    });
});

before(function (done) {
    retext.parse(article, function (err, tree) {
        article = tree;

        done(err);
    });
});

/**
 * No-operation.
 */
function noop() {}

/*
 * Benchmark.
 */

suite('Visit every node', function () {
    bench('A section', function () {
        section.visit(noop);
    });

    bench('An article', function () {
        article.visit(noop);
    });
});

suite('Visit every word node', function () {
    bench('A section', function () {
        section.visit(section.WORD_NODE, noop);
    });

    bench('An article', function () {
        article.visit(article.WORD_NODE, noop);
    });
});
