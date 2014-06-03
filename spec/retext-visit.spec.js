
var visit = require('..'),
    Retext = require('retext'),
    assert = require('assert'),
    retext = new Retext().use(visit).parse('A simple english sentence.'),
    TextOM = retext.TextOM,
    simpleWordNode = retext.head.head.head.next.next;

describe('visit', function () {
    it('should be of type `function`', function () {
        assert(typeof visit === 'function');
    });

    it('should attach a `visit` method to `TextOM.Parent#`', function () {
        assert('visit' in TextOM.Parent.prototype);
        assert('visit' in TextOM.Element.prototype);
        assert('visit' in TextOM.RootNode.prototype);
        assert('visit' in TextOM.ParagraphNode.prototype);
        assert('visit' in TextOM.SentenceNode.prototype);
        assert(typeof retext.visit === 'function');
    });

    it('should attach a `visitType` method to `TextOM.Parent#`', function () {
        assert('visitType' in TextOM.Parent.prototype);
        assert('visitType' in TextOM.Element.prototype);
        assert('visitType' in TextOM.RootNode.prototype);
        assert('visitType' in TextOM.ParagraphNode.prototype);
        assert('visitType' in TextOM.SentenceNode.prototype);
        assert(typeof retext.visitType === 'function');
    });
});

describe('visit(callback)', function () {
    it('should call callback for every node in the context',
        function () {
            var count = 0;

            retext.visit(function () {
                count++;
            });

            assert(count === 10);
        }
    );

    it('should stop iterating when the callback returns false',
        function () {
            var count = 0;

            retext.visit(function (node) {
                count++;
                if (node === simpleWordNode) {
                    return false;
                }
            });

            assert(count === 5);
        }
    );
});

describe('visitType(type, callback)', function () {
    it('should call callback for every node of type `type`, in the context',
        function () {
            var count = 0;

            retext.visitType(retext.WORD_NODE, function () {
                count++;
            });

            assert(count === 4);
        }
    );

    it('should stop iterating when the callback returns false',
        function () {
            var count = 0;

            retext.visitType(retext.WORD_NODE, function (node) {
                count++;
                if (node === simpleWordNode) {
                    return false;
                }
            });

            assert(count === 2);
        }
    );
});
