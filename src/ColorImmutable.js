class ColorImmutable extends Color {
    constructor() {
        super(...arguments);
    }

    pushColor(color) {
        return new ColorImmutable(color);
    }
}

Frost.ColorImmutable = ColorImmutable;