const assert = require('assert');
const { ColorImmutable } = require('../../dist/frost-color.min');

describe('ColorImmutable Schemes', function() {

    describe('#analogous', function() {
        it('returns 2 analogous colors', function() {
            const analogous = ColorImmutable.fromHSV(120, 50, 50).analogous();
            assert.deepStrictEqual(
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
            assert.strictEqual(
                complementary.toString(),
                '#804080'
            );

            assert.ok(
                complementary instanceof ColorImmutable
            );
        });
    });

    describe('#split', function() {
        it('returns 2 split colors', function() {
            const split = ColorImmutable.fromHSV(120, 50, 50).split();
            assert.deepStrictEqual(
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
            assert.deepStrictEqual(
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
                    color => color instanceof ColorImmutable
                )
            );
        });
    });

    describe('#triadic', function() {
        it('returns 2 triadic colors', function() {
            const triadic = ColorImmutable.fromHSV(120, 50, 50).triadic();
            assert.deepStrictEqual(
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

