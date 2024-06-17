const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
    env: {
        browser: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        // Required to use rules which require type information:
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        warnOnUnsupportedTypeScriptVersion: true,
        requireConfigFile: false,
        allowImportExportEverywhere: true,
        babelOptions: {
            presets: ['next/babel'],
            caller: {
                supportsTopLevelAwait: true
            }
        }
    },
    plugins: ['react-hooks', 'jsx-a11y', 'react', 'import', '@next/next', '@typescript-eslint', 'prettier', 'storybook', 'unused-imports'],
    extends: [
        'airbnb-typescript',

        'plugin:@typescript-eslint/recommended',

        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',

        'plugin:prettier/recommended',

        'plugin:jsx-a11y/strict',

        'next/core-web-vitals'
    ],
    rules: {
        curly: [ERROR, 'all'],
        'func-style': OFF,
        'max-lines-per-function': [WARN, 120],
        'sort-keys': OFF,
        'no-ternary': OFF,
        'no-undefined': OFF,
        'id-length': OFF, // TODO : Maybe allow x, y, z, id...
        'capitalized-comments': OFF,
        'no-nested-ternary': ERROR,
        'no-console': ERROR,

        'jsx-a11y/label-has-associated-control': OFF,
        '@typescript-eslint/no-magic-numbers': OFF, // Too much resctricting
        '@typescript-eslint/no-type-alias': OFF,
        '@typescript-eslint/one-var': OFF,
        '@typescript-eslint/prefer-readonly-parameter-types': OFF,
        '@typescript-eslint/no-unsafe-assignment': OFF, // Honestly, this rule is broken.
        '@typescript-eslint/no-unsafe-call': OFF, // Honestly, this rule is broken.
        '@typescript-eslint/no-unsafe-member-access': OFF, // Honestly, this rule is broken.
        '@typescript-eslint/no-unsafe-return': OFF, // Honestly, this rule is broken.
        '@typescript-eslint/no-unused-vars': ERROR,
        '@typescript-eslint/no-empty-interface': [
            ERROR,
            {
                allowSingleExtends: true
            }
        ],
        'react/jsx-sort-props': [
            ERROR,
            {
                callbacksLast: false,
                shorthandFirst: false,
                shorthandLast: false,
                ignoreCase: true,
                noSortAlphabetically: false,
                reservedFirst: true
            }
        ],
        'import/newline-after-import': [ERROR],
        'import/no-default-export': ERROR,
        'import/order': [
            ERROR,
            {
                groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'type'],
                alphabetize: {
                    order: 'desc',
                    caseInsensitive: true
                },
                'newlines-between': 'never'
            }
        ],
        'import/no-extraneous-dependencies': [
            ERROR,
            {
                devDependencies: true,
                optionalDependencies: false,
                peerDependencies: false
            }
        ],
        'unused-imports/no-unused-imports': 'warn',
        '@typescript-eslint/naming-convention': [
            ERROR,
            // Enforce that interface names are in PascalCase but do not begin with an I:
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: false
                }
            },
            // Enforce that boolean variables and function parameters are prefixed with an allowed verb
            {
                selector: 'variable',
                types: ['boolean'],
                format: ['PascalCase'],
                prefix: ['is', 'are', 'should', 'has', 'can', 'did', 'will', 'do', 'was']
            },
            {
                selector: 'parameter',
                types: ['boolean'],
                format: ['PascalCase'],
                prefix: ['is', 'are', 'should', 'has', 'can', 'did', 'will', 'do', 'was']
            },
            // Enforce that type parameters (generics) are prefixed with T
            {
                selector: 'typeParameter',
                format: ['PascalCase'],
                prefix: ['T']
            },
            // Enforce that non-boolean variables are in camelCase :
            {
                selector: 'variable',
                types: ['string', 'number', 'array'],
                format: ['camelCase']
            }
        ],

        'react/forbid-elements': [ERROR, { forbid: [{ element: 'a', message: 'Use src/components/a11y/<Link> instead' }] }],
        'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx'] }],

        'import/no-extraneous-dependencies': [
            ERROR,
            {
                devDependencies: ['**/*.stories.*', '**/.storybook/**/*.*', 'src/faker/*'],
                peerDependencies: true
            }
        ],
        '@next/next/no-img-element': OFF // images are already optimized

        // '@typescript-eslint/no-restricted-imports': [
        //     ERROR,
        //     {
        //         devDependencies: ['**/*.stories.*', '**/.storybook/**/*.*', 'src/faker/*'],
        //         paths: [
        //             '.',
        //             'lodash',
        //         ]
        //     }
        // ],
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        }
    },
    overrides: [
        {
            files: ['scripts/**/*.ts'],
            parserOptions: {
                project: 'scripts/tsconfig.scripts.json',
                ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
                sourceType: 'module' // Allows for the use of imports
            },
            rules: {
                'import/no-extraneous-dependencies': OFF
            }
        },
        {
            files: ['src/**/*.stories.tsx'],
            rules: {
                'storybook/no-title-property-in-meta': ERROR,
                '@typescript-eslint/consistent-type-assertions': OFF,
                'import/no-default-export': OFF
            }
        },
        {
            files: ['src/pages/**/*'],
            rules: {
                'import/no-default-export': OFF
            }
        }
    ]
};
