/**
 * FrostColor v1.0.2
 * https://github.com/elusivecodes/FrostColor
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        Object.assign(global, factory());
    }

})(this, function() {
    'use strict';

    // {{code}}
    return {
        Color,
        ColorImmutable,
        BaseColor,
        CMYColor,
        CMYKColor,
        HSLColor,
        HSVColor,
        RGBColor
    };

});