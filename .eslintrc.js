module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    env: {
        es6: true,
        browser: true,
    },
    extends: [
        'standard',
    ],
    plugins: [
        'svelte3',
    ],
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        // TODO: 本当は1にしたいが.Svelteで何故かエラーになるので2にしている
        'no-multiple-empty-lines': ['error', {'max': 2}],
    },
    settings: {},
    overrides: [
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
}
