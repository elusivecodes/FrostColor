(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        Object.assign(global, factory());
    }

})(window, function() {
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