const assert = require('assert').strict;
const { Color, ColorImmutable } = require('../../dist/frost-color.min');

describe('ColorImmutable Creation Tests', function() {

    describe('#constructor', function() {
        it('works with red argument', function() {
            assert.equal(
                new ColorImmutable(255, 0, 0)
                    .toString(),
                'red'
            );
        });

        it('works with green argument', function() {
            assert.equal(
                new ColorImmutable(0, 255, 0)
                    .toString(),
                'lime'
            );
        });

        it('works with blue argument', function() {
            assert.equal(
                new ColorImmutable(0, 0, 255)
                    .toString(),
                'blue'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                new ColorImmutable(255, 255, 255, 0.5)
                    .toString(),
                'rgba(255, 255, 255, 0.5)'
            );
        });

        it('works with brightness argument', function() {
            assert.equal(
                new ColorImmutable(100)
                    .toString(),
                'white'
            );
        });

        it('works with brightness and alpha arguments', function() {
            assert.equal(
                new ColorImmutable(100, 0.5)
                    .toString(),
                'rgba(255, 255, 255, 0.5)'
            );
        });

        it('works with Color argument', function() {
            const color1 = new Color(255, 0, 0);
            const color2 = new ColorImmutable(color1);
            const color3 = color2.setAlpha(.5);
            assert.equal(
                color1.toString(),
                'red'
            );
            assert.equal(
                color2.toString(),
                'red'
            );
            assert.equal(
                color3.toString(),
                'rgba(255, 0, 0, 0.5)'
            );
        });

        it('works with ColorImmutable argument', function() {
            const color1 = new ColorImmutable(255, 0, 0);
            const color2 = new ColorImmutable(color1);
            const color3 = color2.setAlpha(.5);
            assert.equal(
                color1.toString(),
                'red'
            );
            assert.equal(
                color2.toString(),
                'red'
            );
            assert.equal(
                color3.toString(),
                'rgba(255, 0, 0, 0.5)'
            );
        });
    });

    describe('#fromString', function() {
        it('works with color name', function() {
            assert.equal(
                ColorImmutable.fromString('red')
                    .toString(),
                'red'
            );
        });

        it('works with hex string', function() {
            assert.equal(
                ColorImmutable.fromString('#ff0000')
                    .toString(),
                'red'
            );
        });

        it('works with short hex string', function() {
            assert.equal(
                ColorImmutable.fromString('#f00')
                    .toString(),
                'red'
            );
        });

        it('works with rgb string', function() {
            assert.equal(
                ColorImmutable.fromString('rgb(255, 0, 0)')
                    .toString(),
                'red'
            );
        });

        it('works with rgba string', function() {
            assert.equal(
                ColorImmutable.fromString('rgba(255, 0, 0, 1)')
                    .toString(),
                'red'
            );
        });
    });

    describe('#fromRGB', function() {
        it('works with rgb arguments', function() {
            assert.equal(
                ColorImmutable.fromRGB(155, 30, 70)
                    .toString(),
                '#9b1e46'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                ColorImmutable.fromRGB(180, 100, 30, .5)
                    .toString(),
                'rgba(180, 100, 30, 0.5)'
            );
        });
    });

    describe('#fromHSL', function() {
        it('works with hsl arguments', function() {
            assert.equal(
                ColorImmutable.fromHSL(155, 30, 70)
                    .toString(),
                '#9cc9b6'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                ColorImmutable.fromHSL(180, 100, 30, .5)
                    .toString(),
                'rgba(0, 153, 153, 0.5)'
            );
        });
    });

    describe('#fromHSV', function() {
        it('works with hsv arguments', function() {
            assert.equal(
                ColorImmutable.fromHSV(155, 30, 70)
                    .toString(),
                '#7db39c'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                ColorImmutable.fromHSV(180, 100, 30, .5)
                    .toString(),
                'rgba(0, 77, 77, 0.5)'
            );
        });
    });

    describe('#fromCMY', function() {
        it('works with cmy arguments', function() {
            assert.equal(
                ColorImmutable.fromCMY(77, 15, 35)
                    .toString(),
                '#3bd9a6'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                ColorImmutable.fromCMY(90, 50, 15, .5)
                    .toString(),
                'rgba(25, 128, 217, 0.5)'
            );
        });
    });

    describe('#fromCMYK', function() {
        it('works with cmyk arguments', function() {
            assert.equal(
                ColorImmutable.fromCMYK(77, 15, 35, 45)
                    .toString(),
                '#20775b'
            );
        });

        it('works with alpha argument', function() {
            assert.equal(
                ColorImmutable.fromCMYK(90, 50, 15, 55, .5)
                    .toString(),
                'rgba(11, 57, 98, 0.5)'
            );
        });
    });

});
