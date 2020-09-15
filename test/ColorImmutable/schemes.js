const assert = require('assert').strict;
const { ColorImmutable } = require('../../dist/frost-color.min');

describe('ColorImmutable Schemes', function() {

    describe('#analogous', function() {
        it('returns 2 analogous colors', function() {
            const analogous = ColorImmutable.fromHSV(120, 50, 50).analogous();
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
                    color => color instanceof ColorImmutable
                )
            );
        });
    });

    describe('#complementary', function() {
        it('returns the complementary color', function() {
            const complementary = ColorImmutable.fromHSV(120, 50, 50).complementary();
            assert.equal(
                complementary.toString(),
                '#80407f'
            );

            assert.ok(
                complementary instanceof ColorImmutable
            );
        });
    });

    describe('#split', function() {
        it('returns 2 split colors', function() {
            const split = ColorImmutable.fromHSV(120, 50, 50).split();
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
                    color => color instanceof ColorImmutable
                )
            );
        });
    });

    describe('#tetradic', function() {
        it('returns 3 tetradic colors', function() {
            const tetradic = ColorImmutable.fromHSV(120, 50, 50).tetradic();
            assert.deepEqual(
                tetradic.map(
                    color => color.toString()
                ),
                [
                    '#407f80',
                    '#80407f',
                    '#804040'
                ]
            );

            assert.ok(
                tetradic.every(
                    color => color instanceof ColorImmutable
                )
            );
        });
    });

    describe('#triadic', function() {
        it('returns 2 triadic colors', function() {
            const triadic = ColorImmutable.fromHSV(120, 50, 50).triadic();
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
                    color => color instanceof ColorImmutable
                )
            );
        });
    });

});

