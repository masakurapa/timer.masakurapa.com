module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    plugins: [
    ],
    extends: [
        'eslint:recommended',
    ],
    rules: {
        indent: ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
        'semi': ['error', 'always'],
    },
    settings: {
    },
    overrides: [
    ],
};
