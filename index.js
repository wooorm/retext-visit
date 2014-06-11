'use strict';

exports = module.exports = function () {};

function visit(callback) {
    var node = this.head, next;

    while (node) {
        // Allow for removal of the node in the callback.
        next = node.next;

        if (callback(node) === false) {
            return;
        }

        (node.visit || visit).call(node, callback);

        node = next;
    }
}

function visitType(type, callback) {
    var callbackWrapper = function (node) {
        if (node.type === type) {
            return callback(node);
        }
    };
    this.visit.call(this, callbackWrapper);
}

function attach(retext) {
    var TextOM = retext.parser.TextOM,
        parentPrototype = TextOM.Parent.prototype,
        elementPrototype = TextOM.Element.prototype;

    elementPrototype.visit = parentPrototype.visit = visit;
    elementPrototype.visitType = parentPrototype.visitType = visitType;
}

exports.attach = attach;
