const assert = require('assert').strict;
const Color = require('../dist/frost-color.min').Color;

describe('Color Scheme Tests', function() {

    describe('#analogous', function() {
        it('returns 2 analogous colors', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .analogous()
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408060',
                    '#608040'
                ]
            );
        });
    });

    describe('#complementary', function() {
        it('returns the complementary color', function() {
            assert.equal(
                Color.fromHSV(120, 50, 50)
                    .complementary()
                    .toString(),
                '#804080'
            );
        });
    });

    describe('#split', function() {
        it('returns 2 split colors', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .split()
                    .map(
                        color => color.toString()
                    ),
                [
                    '#604080',
                    '#804060'
                ]
            );
        });
    });

    describe('#tetradic', function() {
        it('returns 3 tetradic colors', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .tetradic()
                    .map(
                        color => color.toString()
                    ),
                [
                    '#408080',
                    '#804080',
                    '#804040'
                ]
            );
        });
    });

    describe('#triadic', function() {
        it('returns 2 triadic colors', function() {
            assert.deepEqual(
                Color.fromHSV(120, 50, 50)
                    .triadic()
                    .map(
                        color => color.toString()
                    ),
                [
                    '#404080',
                    '#804040'
                ]
            );
        });
    });

});

