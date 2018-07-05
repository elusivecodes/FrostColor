Object.assign(Color, {

    mix(color1, color2, amount) {
        color1 = color1.toRGB();
        color2 = color2.toRGB();

        const r = frost.lerp(color1.red, color2.red, amount);
        const g = frost.lerp(color1.green, color2.green, amount);
        const b = frost.lerp(color1.blue, color2.blue, amount);
        const a = frost.lerp(color1.alpha, color2.alpha, amount);

        return new RGB(r, g, b, a);
    },

    multiply(color1, color2) {
        color1 = color1.toRGB();
        color2 = color2.toRGB();

        const r = (color1.red / 255) * (color2.red / 255) * 255;
        const g = (color1.green / 255) * (color2.green / 255) * 255;
        const b = (color1.blue / 255) * (color2.blue / 255) * 255;
        const a = color1.alpha * color2.alpha;

        return new RGB(r, g, b, a);
    }

});