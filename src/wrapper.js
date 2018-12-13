(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        Object.assign(global, factory());
    }

})(window, function() {

    // {{code}}

    return {
        Color,
        ColorImmutable
    };

});