try {
    require('./tests/create');
    require('./tests/attributes');
    require('./tests/manipulation');
} catch (error) {
    console.error('\x1b[31m', error.message);
}