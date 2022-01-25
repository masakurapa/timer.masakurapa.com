module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
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
        'svelte3',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        indent: ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
        'semi': ['error', 'always'],
        "@typescript-eslint/ban-types": ["error",
            {
                "types": {
                    "String": false,
                    "Boolean": false,
                    "Number": false,
                    "Symbol": false,
                    "{}": false,
                    "Object": false,
                    "object": false,
                    "Function": false,
                },
                "extendDefaults": true,
            },
        ],
    },
    settings: {
        'import/core-modules': ['svelte'],
        'import/resolver': {
            alias: {
                map: [
                    ['@app', './app'],
                    ['@components', './app/components'],
                    ['@stores', './app/stores'],
                    ['@utils', './app/utils'],
                ],
                extensions: ['.ts', '.svelte'],
            },
            typescript: {},
        },
    },
    overrides: [
        {
            "files": ["**/*.ts"],
            "extends": [
                "plugin:import/typescript",
                "plugin:@typescript-eslint/recommended",
            ],
            "plugins": [
                "@typescript-eslint",
            ],
        },
        {
            files: ['**/*.svelte'],
            processor: 'svelte3/svelte3',
            rules: {
                'import/first': 0,
                'import/no-duplicates': 0,
                'import/no-mutable-exports': 0,
            },
        },
    ],
};
