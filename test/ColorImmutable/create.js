const assert = require('assert');
const { ColorImmutable } = require('../../dist/frost-color.min');

describe('ColorImmutable Creation', function() {

    describe('#constructor', function() {
        it('works with red argument', function() {
            assert.strictEqual(
                new ColorImmutable(255, 0, 0)
                    .toString(),
                'red'
            );
        });

        it('works with green argument', function() {
            assert.strictEqual(
                new ColorImmutable(0, 255, 0)
                    .toString(),
                'lime'
            );
        });

        it('works with blue argument', function() {
            assert.strictEqual(
                new ColorImmutable(0, 0, 255)
                    .toString(),
                'blue'
            );
        });

        it('works with alpha argument', function() {
            assert.strictEqual(
                new ColorImmutable(255, 255, 255, .5)
                    .toString(),
                'rgb(255 255 255 / 50%)'
            );
        });

        it('works with brightness argument', function() {
            assert.strictEqual(
                new ColorImmutable(100)
                    .toString(),
                'white'
            );
        });

        it('works with brightness and alpha arguments', function() {
            assert.strictEqual(
                new ColorImmutable(100, .5)
                    .toString(),
                'rgb(255 255 255 / 50%)'
            );
        });
    });

    describe('#fromString', function() {
        it('works with color name', function() {
            assert.strictEqual(
                ColorImmutable.fromString('red')
                    .toString(),
                'red'
            );
        });

        it('works with hex string', function() {
            assert.strictEqual(
                ColorImmutable.fromString('#ff0000')
                    .toString(),
                'red'
            );
        });

        it('works with short hex string', function() {
            assert.strictEqual(
                ColorImmutable.fromString('#f00')
                    .toString(),
                'red'
            );
        });

        it('works with rgb string', function() {
            assert.strictEqual(
                ColorImmutable.fromString('rgb(255 0 0)')
                    .toString(),
                'red'
            );
        });

        it('works with alternate rgb string', function() {
            assert.strictEqual(
                ColorImmutable.fromString('rgb(255, 0, 0)')
                    .toString(),
                'red'
            );
        });

        it('works with rgba string', function() {
            assert.strictEqual(
                ColorImmutable.fromString('rgb(255 0 0 / 100%)')
                    .toString(),
                'red'
            );
        });

        it('works with alternate rgba string', function() {
            assert.strictEqual(
                ColorImmutable.fromString('rgba(255, 0, 0, 1)')
                    .toString(),
                'red'
            );
        });

        it('works with hsl string', function() {
            assert.strictEqual(
                ColorImmutable.fromString('hsl(155deg 30% 70%)')
                    .toString(),
                '#9cc9b6'
            );
        });

        it('works with alternate hsl string', function() {
            assert.strictEqual(
                ColorImmutable.fromString('hsl(155, 30%, 70%)')
                    .toString(),
                '#9cc9b6'
            );
        });

        it('works with hsla string', function() {
            assert.strictEqual(
                ColorImmutable.fromString('hsl(180deg 100% 30% / 50%)')
                    .toString(),
                'rgb(0 153 153 / 50%)'
            );
        });

        it('works with alternate hsla string', function() {
            assert.strictEqual(
                ColorImmutable.fromString('hsla(180, 100%, 30%, .5)')
                    .toString(),
                'rgb(0 153 153 / 50%)'
            );
        });

        it('throws error with invalid hex string', function() {
            assert.throws(_ => {
                ColorImmutable.fromString('#INVALID');
            });
        });

        it('throws error with invalid rgb string', function() {
            assert.throws(_ => {
                ColorImmutable.fromString('rgb(INVALID)');
            });
        });

        it('throws error with invalid rgba string', function() {
            assert.throws(_ => {
                ColorImmutable.fromString('rgba(INVALID)');
            });
        });

        it('throws error with invalid hsl string', function() {
            assert.throws(_ => {
                ColorImmutable.fromString('hsl(INVALID)');
            });
        });

        it('throws error with invalid hsla string', function() {
            assert.throws(_ => {
                ColorImmutable.fromString('hsla(INVALID)');
            });
        });

        it('throws error with invalid string', function() {
            assert.throws(_ => {
                ColorImmutable.fromString('INVALID');
            });
        });
    });

    describe('#fromRGB', function() {
        it('works with rgb arguments', function() {
            assert.strictEqual(
                ColorImmutable.fromRGB(155, 30, 70)
                    .toString(),
                '#9b1e46'
            );
        });

        it('works with alpha argument', function() {
            assert.strictEqual(
                ColorImmutable.fromRGB(180, 100, 30, .5)
                    .toString(),
                'rgb(180 100 30 / 50%)'
            );
        });
    });

    describe('#fromHSL', function() {
        it('works with hsl arguments', function() {
            assert.strictEqual(
                ColorImmutable.fromHSL(155, 30, 70)
                    .toString(),
                '#9cc9b6'
            );
        });

        it('works with alpha argument', function() {
            assert.strictEqual(
                ColorImmutable.fromHSL(180, 100, 30, .5)
                    .toString(),
                'rgb(0 153 153 / 50%)'
            );
        });
    });

    describe('#fromHSV', function() {
        it('works with hsv arguments', function() {
            assert.strictEqual(
                ColorImmutable.fromHSV(155, 30, 70)
                    .toString(),
                '#7db39c'
            );
        });

        it('works with alpha argument', function() {
            assert.strictEqual(
                ColorImmutable.fromHSV(180, 100, 30, .5)
                    .toString(),
                'rgb(0 77 77 / 50%)'
            );
        });
    });

    describe('#fromCMY', function() {
        it('works with cmy arguments', function() {
            assert.strictEqual(
                ColorImmutable.fromCMY(77, 15, 35)
                    .toString(),
                '#3bd9a6'
            );
        });

        it('works with alpha argument', function() {
            assert.strictEqual(
                ColorImmutable.fromCMY(90, 50, 15, .5)
                    .toString(),
                'rgb(25 128 217 / 50%)'
            );
        });
    });

    describe('#fromCMYK', function() {
        it('works with cmyk arguments', function() {
            assert.strictEqual(
                ColorImmutable.fromCMYK(77, 15, 35, 45)
                    .toString(),
                '#20775b'
            );
        });

        it('works with alpha argument', function() {
            assert.strictEqual(
                ColorImmutable.fromCMYK(90, 50, 15, 55, .5)
                    .toString(),
                'rgb(11 57 98 / 50%)'
            );
        });
    });

});
