const assert = require('assert').strict;
const Color = require('../dist/frost-color.min').Color;

describe('Color Manipulation Tests', function() {

    describe('#darken', function() {
        it('darkens the color', function() {
            assert.equal(
                Color.fromHSV(120, 50, 50)
                    .darken(.5)
                    .toString(),
                '#204040'
            );
        });
    });

    describe('#invert', function() {
        it('inverts the color', function() {
            assert.equal(
                Color.fromRGB(120, 50, 50)
                    .invert()
                    .toString(),
                '#87cdcd'
            );
        });
    });

    describe('#lighten', function() {
        it('lightens the color', function() {
            assert.equal(
                Color.fromHSV(120, 50, 50)
                    .lighten(.5)
                    .toString(),
                '#95caca'
            );
        });
    });

    describe('#shade', function() {
        it('shades the color', function() {
            assert.equal(
                Color.fromHSV(120, 50, 50)
                    .shade(.3)
                    .toString(),
                '#2d592d'
            );
        });
    });

    describe('#tint', function() {
        it('tints the color', function() {
            assert.equal(
                Color.fromHSV(120, 50, 50)
                    .tint(.3)
                    .toString(),
                '#79a679'
            );
        });
    });

    describe('#tone', function() {
        assert.equal(
            Color.fromHSV(120, 50, 50)
                .tone(.3)
                .toString(),
            '#538053'
        );
    });

});
