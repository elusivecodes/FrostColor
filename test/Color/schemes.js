const assert = require('assert').strict;
const { Color } = require('../../dist/frost-color.min');

describe('Color Scheme Tests', function() {

    describe('#analogous', function() {
        it('returns 2 analogous colors', function() {
            const analogous = Color.fromHSV(120, 50, 50).analogous();
            assert.deepEqual(
                analogous.map(
                    color => color.toString()
                ),
                [
                    '#408060',
                    '#608040'
                ]
            );

            assert.ok(
                analogous.every(
                    color => color instanceof Color
                )
            );
        });
    });

    describe('#complementary', function() {
        it('returns the complementary color', function() {
            const complementary = Color.fromHSV(120, 50, 50).complementary();
            assert.equal(
                complementary.toString(),
                '#804080'
            );

            assert.ok(
                complementary instanceof Color
            );
        });
    });

    describe('#split', function() {
        it('returns 2 split colors', function() {
            const split = Color.fromHSV(120, 50, 50).split();
            assert.deepEqual(
                split.map(
                    color => color.toString()
                ),
                [
                    '#604080',
                    '#804060'
                ]
            );

            assert.ok(
                split.every(
                    color => color instanceof Color
                )
            );
        });
    });

    describe('#tetradic', function() {
        it('returns 3 tetradic colors', function() {
            const tetradic = Color.fromHSV(120, 50, 50).tetradic();
            assert.deepEqual(
                tetradic.map(
                    color => color.toString()
                ),
                [
                    '#408080',
                    '#804080',
                    '#804040'
                ]
            );

            assert.ok(
                tetradic.every(
                    color => color instanceof Color
                )
            );
        });
    });

    describe('#triadic', function() {
        it('returns 2 triadic colors', function() {
            const triadic = Color.fromHSV(120, 50, 50).triadic();
            assert.deepEqual(
                triadic.map(
                    color => color.toString()
                ),
                [
                    '#404080',
                    '#804040'
                ]
            );

            assert.ok(
                triadic.every(
                    color => color instanceof Color
                )
            );
        });
    });

});

